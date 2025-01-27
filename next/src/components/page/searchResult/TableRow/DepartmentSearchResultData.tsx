import Link from 'next/link'
import { ListProps } from '@/types/SearchResult'

export const DepartmentSearchResultData = ({
  displayUniversities,
  deviationValuesList,
}: ListProps) => {
  const afterDevisionUniversity = displayUniversities.filter((uni) => {
    return deviationValuesList.includes(String(uni.deviation_value))
  })

  if (afterDevisionUniversity.length === 0) {
    return (
      <div className="text-center text-red-500">
        <p>該当する偏差値の大学が見つかりませんでした。</p>
      </div>
    )
  }

  return (
    <tbody>
      {afterDevisionUniversity.map((univers, i: number) => (
        <tr key={i} className="border-b border-gray-300">
          <td className="px-2 py-3 text-center sm:p-4">
            <Link
              href={`/current/schools/${univers.code}/details/${univers.faculty_of_code}`}
            >
              <span className="block">{univers.university}大学</span>
            </Link>
          </td>
          <td className="px-2 py-3 text-center sm:p-4">
            <span className="block">{univers.faculty}学部</span>
          </td>
          {univers.department === '' ? (
            <td className="px-2 py-3 sm:p-4"></td>
          ) : (
            <td className="px-2 py-3 text-center sm:p-4">
              <span className="block">{univers.department}学科</span>
            </td>
          )}
          <td className="justify-center">
            <span className="flex justify-center text-center">
              {univers.department_system}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
