import { SelectStudyTypeProps } from '@/types/Management/selectType'

export const SelectStudyType: React.FC<SelectStudyTypeProps> = ({
  studyType,
  handleChangeStudyType,
  selectStudyType,
}: SelectStudyTypeProps) => {
  return (
    <div className="m-1 bg-slate-200 p-1">
      <div className="m-1 bg-slate-100 p-1">
        <label className="p-1" htmlFor="study-type-select">
          学習タイプ変更ボタン :
        </label>
        <select
          id="study-type-select"
          defaultValue={studyType}
          onChange={(e) => handleChangeStudyType(e)}
        >
          {selectStudyType}
        </select>
      </div>
    </div>
  )
}
