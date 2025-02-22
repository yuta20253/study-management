import { ProgressProps } from '@/types/Todo/Form/form'

export const TodoEditProgress = ({ theme, props }: ProgressProps) => {
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-1/2">
        {props === '完了' ? '完了' : props === '途中' ? '途中' : '未完了'}
      </td>
    </tr>
  )
}
