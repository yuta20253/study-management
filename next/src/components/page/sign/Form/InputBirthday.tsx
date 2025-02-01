import { birthdayProps } from '@/types/SignUp/form'

export const BirthdayInput = ({ theme, register, error, setDate }: birthdayProps) => {
  return (
    <>
      <tr>
        <th className="h-12 bg-sky-600 text-center text-xl text-white">
          {theme}
        </th>
        <td className="border border-slate-500 p-2">
          <input
            type="date"
            className="w-full rounded border border-slate-300 p-2"
            {...register}
            onChange={(e) => setDate(e.target.value)}
          />
          {error && <p className="text-xs text-red-500">{error.message}</p>}
        </td>
      </tr>
    </>
  )
}
