import { useFormContext } from 'react-hook-form'
import { NameProps } from '@/types/User/Form/form'

export const UserNameEditInput = ({
  theme,
  first,
  last,
  label_first,
  label_second,
  registerFirstProps,
  registerSecondProps,
  rules,
  errorFirst,
  errorSecond,
}: NameProps) => {
  const { register } = useFormContext()

  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500">
        <p className="flex h-12 items-center justify-center border border-slate-500 bg-sky-600 text-center text-xl text-white">
          {theme}
        </p>
      </th>
      <td className="border border-slate-500">
        <div className="flex">
          <div className="">
            <label htmlFor={registerFirstProps} className="sr-only">
              {label_first}
            </label>
            <input
              id={registerFirstProps}
              type="text"
              defaultValue={first}
              {...register(`${registerFirstProps}`, rules)}
              className="w-full rounded border"
            />
            {errorFirst && (
              <p className="mt-1 text-xs text-red-500">{errorFirst.message}</p>
            )}
          </div>
          <div>
            <label htmlFor={registerSecondProps} className="sr-only">
              {label_second}
            </label>
            <input
              id={registerSecondProps}
              type="text"
              defaultValue={last}
              {...register(`${registerSecondProps}`, rules)}
              className="w-full rounded border"
            />
            {errorSecond && (
              <p className="mt-1 text-xs text-red-500">{errorSecond.message}</p>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}
