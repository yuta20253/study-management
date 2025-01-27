import { StudyTypeProps } from '@/types/Todo/Form/form'

export const TodoEditStudyType = ({ theme, props }: StudyTypeProps) => {
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-1/2">{props}</td>
    </tr>
  )
}
