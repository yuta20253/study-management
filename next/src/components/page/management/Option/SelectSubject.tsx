import { Subjects } from '@/const/subject'
export const SelectSubject = Subjects.map((subject: string, i: number) => (
  <option key={i} value={subject}>
    {subject}
  </option>
))
