import { TestThemeProps } from '@/types/Schools/Faculty/table'

export const TestTheme = ({ title }: TestThemeProps) => {
  return (
    <th className="border-b  border-gray-500 bg-sky-600">
      <p className="text-center text-white">{title}</p>
    </th>
  )
}
