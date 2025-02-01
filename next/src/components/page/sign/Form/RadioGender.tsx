import { GenderProps } from '@/types/SignUp/form'

export const RadioGender = ({
  theme,
  valueFirst,
  registerFirst,
  labelFirst,
  valueSecond,
  registerSecond,
  labelSecond,
  changeGender,
}: GenderProps) => {
  return (
    <>
      <tr>
        <th className="h-12 bg-sky-600 text-center text-xl text-white">
          {theme}
        </th>
        <td className="border border-slate-500 p-2">
          <div className="flex items-center">
            <input
              type="radio"
              value={valueFirst}
              className="mr-2"
              {...registerFirst}
              onChange={changeGender}
            />
            <label className="mr-4">{labelFirst}</label>
            <input
              type="radio"
              value={valueSecond}
              className="mr-2"
              {...registerSecond}
              onChange={changeGender}
            />
            <label>{labelSecond}</label>
          </div>
        </td>
      </tr>
    </>
  )
}
