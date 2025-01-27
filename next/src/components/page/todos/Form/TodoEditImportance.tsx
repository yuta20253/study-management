import { useFormContext } from 'react-hook-form'
import { ImportanceProps } from '@/types/Todo/Form/form'

export const TodoEditImportance = ({
  theme,
  props,
  registerImportance,
  setImportance,
}: ImportanceProps) => {
  const { register } = useFormContext()
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-1/2">
        <select
          defaultValue={props}
          {...register(`${registerImportance}`, { required: true })}
          onChange={(e) => setImportance(e.target.value)}
        >
          <option value={'低'}>低</option>
          <option value={'中'}>中</option>
          <option value={'高'}>高</option>
        </select>
      </td>
    </tr>
  )
}
