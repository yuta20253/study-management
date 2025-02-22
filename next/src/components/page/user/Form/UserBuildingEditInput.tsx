import axios, { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BuildingProps } from '@/types/User/Form/form'

export const UserBuildingEditInput = ({
  theme,
  props,
  registerProps,
  rules,
  error,
}: BuildingProps) => {
  const { register, setValue } = useFormContext()
  const isPostalCodeField = registerProps === 'address.postal_code'
  const [inputValue, setInputValue] = useState<string>(props || '')

  // propsの初期値があるとき、ハイフン（郵便番号の時だけ）
  useEffect(() => {
    if (isPostalCodeField && props?.length === 7) {
      setInputValue(`${props.slice(0, 3)}-${props.slice(3)}`)
    } else {
      setInputValue(props || '')
    }
  }, [props, isPostalCodeField])

  // 郵便番号入力時にハイフンを自動追加＆住所を補完
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let enteredValue = e.target.value

    // 郵便番号の時のみ、数字以外を削除
    if (isPostalCodeField) {
      enteredValue = enteredValue.replace(/[^0-9]/g, '')

      // 7桁になったらフォーマット（例: 123-4567）
      if (enteredValue.length === 7) {
        const formattedValue = `${enteredValue.slice(0, 3)}-${enteredValue.slice(3)}`
        setInputValue(formattedValue)
        setValue(registerProps, formattedValue) // フォームの値も更新

        // 住所自動補完を実行
        try {
          const response: AxiosResponse = await axios.get(
            `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${enteredValue}`,
          )

          if (response.data?.results?.length > 0) {
            const { address1, address2, address3 } = response.data.results[0]
            setValue('address.prefecture', address1)
            setValue('address.city', address2)
            setValue('address.address1', address3)
          }
        } catch {
          console.error('住所の取得に失敗しました')
        }
      } else {
        setInputValue(enteredValue)
      }
    } else {
      // 他の項目（都道府県、市区町村など）は自由に入力可能
      setInputValue(enteredValue)
      setValue(registerProps, enteredValue)
    }
  }

  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500">
        <p className="flex h-12 items-center justify-center bg-sky-600 text-center text-xl text-white">
          {theme}
        </p>
      </th>
      <td className="border border-slate-500">
        <label htmlFor={registerProps} className="sr-only">
          {theme}
        </label>
        <input
          id={registerProps}
          type="text"
          value={inputValue}
          placeholder={isPostalCodeField ? 'ハイフンなし' : ''}
          {...register(registerProps, rules)}
          onChange={handleInputChange}
          data-testid="building-edit-input"
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
