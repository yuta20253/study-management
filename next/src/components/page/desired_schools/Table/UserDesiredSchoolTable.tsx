import Link from 'next/link'
import { useState } from 'react'
import { DeleteButton } from '@/components/page/desired_schools/Button/DeleteDesiredSchoolButton'
import {
  DesiredSchoolProps,
  DesiredSchools,
} from '@/types/DesiredSchool/Table/DesiredSchoolTable'

export const UserDesiredSchoolTable: React.FC<DesiredSchools> = ({
  universities,
}: DesiredSchools) => {
  const [isDelete, setIsDelete] = useState<boolean>(false)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-center text-sm sm:text-base">
              志望順位
            </th>
            <th className="px-4 py-2 text-center text-sm sm:text-base">
              大学名
            </th>
            <th className="px-4 py-2 text-center text-sm sm:text-base">学部</th>
            <th className="px-4 py-2 text-center text-sm sm:text-base">学科</th>
            <th className="px-4 py-2 text-center text-sm sm:text-base"></th>
          </tr>
        </thead>
        <tbody>
          {universities &&
            universities.map((university: DesiredSchoolProps, i: number) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2 text-center text-sm sm:text-base">
                  {i + 1}
                </td>
                <td className="px-4 py-2 text-center text-sm sm:text-base">
                  <Link
                    href={`/current/schools/${university.code}/details/${university.faculty_of_code}`}
                    className="text-blue-500 hover:underline"
                  >
                    {university.university}
                  </Link>
                </td>
                <td className="px-4 py-2 text-center text-sm sm:text-base">
                  {university.faculty}
                </td>
                <td className="px-4 py-2 text-center text-sm sm:text-base">
                  {university.department}
                </td>
                <td className="px-4 py-2 text-center">
                  <DeleteButton
                    id={university.id}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
