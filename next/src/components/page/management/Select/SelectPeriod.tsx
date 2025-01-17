import { SelectPeriodProps } from '@/types/Management/selectType'

export const SelectPeriod: React.FC<SelectPeriodProps> = ({
  displiedPeriod,
  selectPeriodLists,
  handleChangeDisplayPeriod,
  handleCreatePeriod,
}: SelectPeriodProps) => {
  return (
    <div className="m-1 bg-slate-200 p-1">
      <div className="m-1 bg-slate-100 p-1">
        <label className="p-1" htmlFor="period-select">
          表示期間変更ボタン :
        </label>
        <select
          id="period-select"
          defaultValue={displiedPeriod}
          onChange={(e) => handleChangeDisplayPeriod(e)}
          onBlur={(e) => handleCreatePeriod(e)}
        >
          {selectPeriodLists}
        </select>
      </div>
    </div>
  )
}
