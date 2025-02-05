import { useFormContext } from 'react-hook-form'
import { DescriptionProps } from '@/types/Todo/Form/form'

export const TodoEditDescription = ({
  theme,
  props,
  registerDescription,
  setDescription,
  rules,
  error,
}: DescriptionProps) => {
  const { register } = useFormContext()

  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td>
        <label htmlFor={registerDescription} className="sr-only">
          説明
        </label>
        <textarea
          id={registerDescription}
          className="h-24 w-3/4 border border-slate-500"
          defaultValue={props}
          {...register(registerDescription, rules)}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="description"
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
