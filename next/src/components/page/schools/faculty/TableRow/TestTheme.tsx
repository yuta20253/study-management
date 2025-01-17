type DataProps = {
  title: string
}

export const TestTheme = ({ title }: DataProps) => {
  return (
    <th className="border-b  border-gray-500 bg-sky-600">
      <p className="text-center text-white">{title}</p>
    </th>
  )
}
