const selectPeriodArr = ['未選択', '全期間', '日別', '週別', '月別']
export const SelectPeriodLists = selectPeriodArr.map((list, i: number) => (
  <option key={i} value={list}>
    {list}
  </option>
))
