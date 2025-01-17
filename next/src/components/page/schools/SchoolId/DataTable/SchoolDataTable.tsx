/* eslint-disable react/prop-types */
import Link from 'next/link'
import { SchoolDataTableProps } from '@/types/Schools/Table/SchoolDataTable'

export const SchoolDataTable: React.FC<SchoolDataTableProps> = ({
  university,
  universityLength,
  school_id,
}) => {
  return (
    <div className="m-auto w-full items-center justify-center">
      <table className="m-auto w-full">
        <tbody className="w-full">
          {[...Array(universityLength)].map((_, i: number) => (
            <tr
              key={i}
              className="flex border-collapse border-b border-gray-500"
            >
              <td className="h-8 w-1/2">
                <p className="text-center">
                  {university['uni']['data'][i]['faculty']}学部
                </p>
              </td>
              <Link
                href={`/current/schools/${school_id}/details/${university['uni']['data'][i]['faculty_of_code']}`}
                className="w-1/2"
              >
                <p className="text-center">
                  {university['uni']['data'][i]['department']} 学科
                </p>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
