import { Dispatch, SetStateAction } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

type DataStringProps = {
  theme: string
  props: string
  registerDescription: string
  setDescription: Dispatch<SetStateAction<string>>
  rules?: {
    maxLength: { value: number; message: string }
  }
  error?: FieldError
}

export const TodoEditDescription = ({
  theme,
  props,
  registerDescription,
  setDescription,
  rules,
  error,
}: DataStringProps) => {
  const { register } = useFormContext()

  //const descriptionId = `${registerDescription}-textarea`

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
        {/* エラー表示 */}
      </td>
    </tr>
  )
}
