import { Subjects } from '@/const/subject'
export const SelectSubject = Subjects.map((subject: string, i: number) => {
  return (
    <option value={subject} key={i}>
      {subject}
    </option>
  )
})
