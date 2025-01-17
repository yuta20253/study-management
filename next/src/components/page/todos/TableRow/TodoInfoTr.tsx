type DataProps = {
  title: string
  data1: string | number
}

export const TodoInfoTr = ({ title, data1 }: DataProps) => {
  return (
    <>
      <tr className="h-7 w-full flex-col items-center justify-center">
        <th>{title}</th>
        <td>{data1}</td>
      </tr>
    </>
  )
}
