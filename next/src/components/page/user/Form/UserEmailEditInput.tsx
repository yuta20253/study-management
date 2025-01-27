import { useFormContext } from 'react-hook-form'
import { EmailProps } from '@/types/User/Form/form'

export const UserEmailEditInput = ({
  theme,
  email,
  registerProps,
}: EmailProps) => {
  const { register } = useFormContext()
  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500 ">
        <p className="flex h-12 items-center justify-center bg-sky-600 text-center text-base text-white">
          {theme}
        </p>
      </th>
      <td className="border border-slate-500">
        <input
          type="email"
          defaultValue={email}
          {...register(`${registerProps}`, {
            required: true,
            //pattern: /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i,
          })}
        />
      </td>
    </tr>
  )
}
