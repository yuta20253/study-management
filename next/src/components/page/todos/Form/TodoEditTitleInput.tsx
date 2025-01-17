import { Dispatch, SetStateAction } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { titleRules } from '@/validations/todos/validation'

type TitleProps = {
  theme: string
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  registerTitle: string
  rules?: {
    required: string
  }
  error?: FieldError
}

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
        {/* Label added here */}
        <label htmlFor={registerTitle} className="sr-only">
          タイトル
        </label>
        <input
          id={registerTitle} // Matching id with the label's htmlFor
          data-testid="title"
          type="text"
          defaultValue={title}
          {...register(registerTitle, titleRules)}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}{' '}
        {/* エラー表示 */}
      </td>
    </tr>
  )
}
