type DataProps = {
  title: string
  data1?: string | number
  data2?: string | number
  data3?: string | number
  data4?: string | number
  data5?: string | number
  data6?: string | number
}

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
