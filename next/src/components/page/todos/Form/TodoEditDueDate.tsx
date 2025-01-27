import { useFormContext } from 'react-hook-form'
import { DueDateProps } from '@/types/Todo/Form/form'
import { dueDateFormat } from '@/utils/formatDate'
import {} from '@/validations/todos/validation'

export const TodoEditDueDate = ({
  theme,
  props,
  setDueDate,
  registerDueDate,
  error,
}: DueDateProps) => {
  const { register } = useFormContext()
  const today = new Date().toISOString().split('T')[0]
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-1/2">
        {/* Label added here */}
        <label htmlFor={registerDueDate} className="sr-only">
          締切
        </label>
        <input
          id="due_date"
          type="date"
          value={dueDateFormat(new Date(props))}
          {...register(registerDueDate, {
            required: '締切は必須です。',
            validate: {
              notBeforeToday: (value) => {
                if (new Date(value) < new Date(today)) {
                  return '過去日は登録できません'
                }
                return true
              },
            },
          })}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </td>
    </tr>
  )
}
