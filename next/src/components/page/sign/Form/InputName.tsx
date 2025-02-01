import { NameProps } from '@/types/SignUp/form'

export const NameInput = ({
  theme,
  placeholderFirst,
  placeholderSecond,
  registerFirst,
  registerSecond,
  errorFirst,
  errorSecond,
}: NameProps) => {
  return (
    <>
      <tr>
        <th className="h-12 bg-sky-600 text-center text-xl text-white">
          {theme}
        </th>
        <td className="border border-slate-500 p-2">
          <input
            type="text"
            placeholder={placeholderFirst}
            className="w-full rounded border border-slate-300 p-2"
            {...registerFirst}
          />
          {errorFirst && (
            <p className="mt-1 text-xs text-red-500">{errorFirst.message}</p>
          )}
          <input
            type="text"
            placeholder={placeholderSecond}
            className="mt-2 w-full rounded border border-slate-300 p-2"
            {...registerSecond}
          />
          {errorSecond && (
            <p className="mt-1 text-xs text-red-500">{errorSecond.message}</p>
          )}
        </td>
      </tr>
    </>
  )
}
