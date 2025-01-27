import { ScoreOfExamInfoTrProps } from '@/types/Schools/Faculty/table'

export const ScoreOfExamInfoTr = ({ title, data1 }: ScoreOfExamInfoTrProps) => {
  return (
    <>
      <tr className="flex">
        <th className="w-1/2 border-b border-r border-gray-500 bg-sky-600 text-white">
          {title}
        </th>
        <td className="w-1/2 border-x-0 border-b border-gray-500">
          <p className="text-center">{data1}</p>
        </td>
      </tr>
    </>
  )
}
