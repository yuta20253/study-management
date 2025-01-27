import { useFormContext } from 'react-hook-form'
import { PhoneProps } from '@/types/User/Form/form'

export const UserPhoneEditInput = ({
  theme,
  props,
  registerProps,
  rules,
  error,
}: PhoneProps) => {
  const { register } = useFormContext()

  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500 ">
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
          type="tel"
          defaultValue={props}
          //onChange={(e) => changePhoneNumber(e)}
          {...register(`${registerProps}`, rules)}
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
