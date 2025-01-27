import { DataProps } from '@/types/User/Table/table'

export const UserInfoTr = ({
  title,
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
}: DataProps) => {
  return (
    <>
      <tr>
        <th className="h-12 border border-slate-500 bg-sky-600">
          <span className="flex h-10 items-center justify-center text-center text-2xl text-white">
            {title}
          </span>
        </th>
      </tr>
      <tr>
        <td>
          <span className="flex h-10 items-center justify-center text-center text-2xl">
            {data1}
            {data2}
            {data3}
            {data4}
            {data5}
            {data6}
          </span>
        </td>
      </tr>
    </>
  )
}
