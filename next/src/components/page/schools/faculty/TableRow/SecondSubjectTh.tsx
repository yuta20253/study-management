import { SecondSubjectThProps } from '@/types/Schools/Faculty/table'

export const SecondSubjectTh = ({ title }: SecondSubjectThProps) => {
  return (
    <>
      <th className="w-1/6 border-0 border-gray-500 bg-sky-500 text-white">
        {title}
      </th>
    </>
  )
}

export const SecondSubjectThWithSpan = ({
  title,
  style,
}: SecondSubjectThProps) => {
  return (
    <>
      <th className="w-1/6 border-0 border-gray-500 bg-sky-500 text-white">
        <span className={`${style}`}>{title}</span>
      </th>
    </>
  )
}
