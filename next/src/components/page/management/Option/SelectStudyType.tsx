const studyTypeArr = ['全て', '予習', '授業', '復習']
export const SelectStudyType = studyTypeArr.map((type: string, i: number) => (
  <option key={i} value={type}>
    {type}
  </option>
))
