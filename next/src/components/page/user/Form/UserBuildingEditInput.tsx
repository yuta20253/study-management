import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
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
  const [postalCode, setPostalCode] = useState<string>(props || '') // 初期郵便番号
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setIsAddressAutoFilled] = useState<boolean>(false) // 住所自動補完の状態を管理
  const [addressError, setAddressError] = useState<boolean>(false) // 住所取得失敗のエラー管理
  // 郵便番号入力時に住所を自動補完する関数
  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const enteredPostalCode = e.target.value
    setPostalCode(enteredPostalCode)

    // 郵便番号が7桁の場合のみ自動補完を行う
    if (enteredPostalCode.length === 7) {
      setIsLoading(true)
      try {
        // 郵便番号検索APIを呼び出す
        const response: AxiosResponse = await axios.get(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${enteredPostalCode}`,
        )

        if (response.data && response.data.results) {
          const { address1, address2, address3 } = response.data.results[0]
          // 住所をフォームにセットする
          setValue('address.prefecture', address1)
          setValue('address.city', address2)
          setValue('address.address1', address3)
          setIsAddressAutoFilled(true) // 住所が自動補完された
          setAddressError(false)
        } else {
          throw new Error('住所の取得に失敗しました')
        }
      } catch (error) {
        console.error('住所の取得に失敗しました:', error)
        // エラーメッセージを表示するための状態を設定
        setIsAddressAutoFilled(false)
        setAddressError(true) // 住所取得エラーを設定
        // 住所取得に失敗した場合、3秒後にエラーメッセージを非表示にする
        setTimeout(() => {
          setAddressError(false)
        }, 3000)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsAddressAutoFilled(false) // 7桁未満の場合、自動補完フラグをリセット
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
          value={postalCode}
          {...register(registerProps, rules)}
          onChange={handlePostalCodeChange} // 郵便番号変更時に自動補完
          data-testid="postal-code-input"
        />
        {isLoading && <p className="text-xs text-gray-500">住所を取得中...</p>}
        {addressError && (
          <p className="text-xs text-red-500">住所の取得に失敗しました</p>
        )}
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
