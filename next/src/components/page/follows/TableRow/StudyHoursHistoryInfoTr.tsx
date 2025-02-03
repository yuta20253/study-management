import { StudyHoursHistoryInfoProps } from '@/types/Follows'
import { StudyHoursProps } from '@/types/Management'

export const StudyHoursHistoryInfo = ({
  studyHours,
}: StudyHoursHistoryInfoProps) => {
  return (
    <>
      {studyHours.map((studyHour: StudyHoursProps, i: number) => (
        <tr
          key={i}
          className="flex items-center justify-center border-b border-gray-200"
        >
          <th className="flex-1 px-4 py-2 text-center text-xl font-medium">
            タイトル
          </th>
          <td className="flex-1 px-4 py-2 text-center ">{studyHour.title}</td>
        </tr>
      ))}
    </>
  )
}
