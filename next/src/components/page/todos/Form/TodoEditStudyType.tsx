type DataStringProps = {
  theme: string
  props: string
}

export const TodoEditStudyType = ({ theme, props }: DataStringProps) => {
  return (
    <tr className="w-full">
      <th className="mt-2 h-12 w-1/2">{theme}</th>
      <td className="h-8 w-1/2">{props}</td>
    </tr>
  )
}
