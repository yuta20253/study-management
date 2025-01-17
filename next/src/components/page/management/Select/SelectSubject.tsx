import { SelectSubjectProps } from '@/types/Management/selectType'

export const SelectSubject: React.FC<SelectSubjectProps> = ({
  subjectName,
  handleSelectSubject,
  selectSubject,
}: SelectSubjectProps) => {
  return (
    <div className="m-1 bg-slate-200 p-1">
      <div className="m-1 bg-slate-100 p-1">
        <label className="p-1" htmlFor="subject-select">
          科目変更ボタン :
        </label>
        <select
          id="subject-select"
          onChange={(e) => handleSelectSubject(e)}
          defaultValue={subjectName}
        >
          {selectSubject}
        </select>
      </div>
    </div>
  )
}
