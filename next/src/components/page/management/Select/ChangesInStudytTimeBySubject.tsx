import { ChangesInStudytTimeBySubjectProps } from '@/types/Management/selectType'

export const ChangesInStudytTimeBySubject: React.FC<
  ChangesInStudytTimeBySubjectProps
> = ({
  subjectName,
  selectSubject,
  handleSelectSubjectName,
}: ChangesInStudytTimeBySubjectProps) => {
  return (
    <div className="m-1 bg-slate-200 p-1">
      <div className="m-1 bg-slate-100 p-1">
        <label className="p-1" htmlFor="subject-select">
          選択科目
        </label>
        <select
          id="subject-select"
          onChange={(e) => handleSelectSubjectName(e)}
          defaultValue={subjectName}
        >
          {selectSubject}
        </select>
      </div>
    </div>
  )
}
