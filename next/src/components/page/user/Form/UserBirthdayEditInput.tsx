import { FieldError, useFormContext } from 'react-hook-form'
type BirthdayProps = {
  theme: string
  date: string
  registerProps: string
  error?: FieldError
}

export const UserBirthdayEditInput = ({
  theme,
  date,
  registerProps,
  error,
}: BirthdayProps) => {
  const { register } = useFormContext()
  const today = new Date().toISOString().split('T')[0]
  return (
    <tr>
      <th className="h-12 items-center justify-center border border-slate-500 ">
        <p className="flex h-12 items-center justify-center bg-sky-600 text-center text-xl text-white">
          {theme}
        </p>
      </th>
      <td className="border border-slate-500">
        <label htmlFor={registerProps} className="sr-only">
          生年月日
        </label>
        <input
          id={registerProps}
          type="date"
          defaultValue={date}
          {...register(`${registerProps}`, {
            required: '誕生日は必須です。',
            validate: {
              notAfterToday: () => {
                if (new Date(date) > new Date(today)) {
                  return '未来日は登録できません'
                }
                return true
              },
            },
          })}
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
