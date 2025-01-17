import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
type GenderProps = {
  theme: string
  gender: string
  registerProps: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

export const UserGenderEditRadio = ({
  theme,
  gender,
  registerProps,
  selected,
  setSelected,
}: GenderProps) => {
  const { register } = useFormContext()
  const changeGender = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value)
    console.log('性別が変わりました')
    console.log(selected)
  }
  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500 ">
        <p className="flex h-12 items-center justify-center bg-sky-600 text-center text-xl text-white ">
          {theme}
        </p>
      </th>
      <td className="border border-slate-500">
        <label htmlFor={registerProps} className="sr-only">
          性別
        </label>
        <input
          id="male"
          type="radio"
          value={'male'}
          defaultChecked={gender === '男' ? true : false}
          {...register(`${registerProps}`, { required: true })}
          onChange={(e) => changeGender(e)}
        />
        <label htmlFor="male">男</label>
        <input
          id="female"
          type="radio"
          value={'female'}
          defaultChecked={gender === '女' ? true : false}
          {...register(`${registerProps}`, { required: true })}
          onChange={(e) => changeGender(e)}
        />
        <label htmlFor="female">女</label>
      </td>
    </tr>
  )
}
