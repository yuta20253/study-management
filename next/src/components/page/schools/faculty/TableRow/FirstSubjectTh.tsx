import { TitleProps } from '@/types/Schools/Faculty/table'

export const FirstSubjectTh = ({ title }: TitleProps) => {
  return (
    <>
      <th className="w-1/6 border-0 border-gray-500 bg-sky-500 text-white">
        {title}
      </th>
    </>
  )
}
