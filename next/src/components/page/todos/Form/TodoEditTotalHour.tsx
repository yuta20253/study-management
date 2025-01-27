import { TotalHourProps } from '@/types/Todo/Form/form'

export const TodoEditTotalHour = ({ theme, props }: TotalHourProps) => {
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-1/2">{props}時間</td>
    </tr>
  )
}
