import { InputProps } from '@/types/SignUp/form'

export const Input = ({ theme, type, placeholder, register, error }: InputProps) => {
  return (
    <tr>
      <th className="h-12 bg-sky-600 text-center text-xl text-white">
        {theme}
      </th>
      <td className="border border-slate-500 p-2">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded border border-slate-300 p-2"
          {...register}
        />
         {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
