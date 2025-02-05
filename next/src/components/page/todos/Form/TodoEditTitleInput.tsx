import { useFormContext } from 'react-hook-form'
import { TitleProps } from '@/types/Todo/Form/form'
import { titleRules } from '@/validations/todos/validation'

export const TodoEditTitle = ({
  theme,
  title,
  setTitle,
  registerTitle,
  error,
}: TitleProps) => {
  const { register } = useFormContext()

  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2" data-testid="test-title">
        {theme}
      </th>
      <td className="h-8 w-1/2">
        <label htmlFor={registerTitle} className="sr-only">
          タイトル
        </label>
        <input
          id={registerTitle}
          data-testid="title"
          type="text"
          defaultValue={title}
          {...register(registerTitle, titleRules)}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}{' '}
      </td>
    </tr>
  )
}
