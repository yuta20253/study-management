import { TodoInfoTrProps } from '@/types/Todo/TableRow/tableRow'

export const TodoInfoTr = ({ title, data1 }: TodoInfoTrProps) => {
  return (
    <>
      <tr className="h-7 w-full flex-col items-center justify-center">
        <th>{title}</th>
        <td>{data1}</td>
      </tr>
    </>
  )
}
