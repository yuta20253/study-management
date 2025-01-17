import { DepartmentArr } from '@/const/departmentArr'
import { University } from '@/types/SearchResult'

type DepartmentSystemProps = {
  afterDevisionUniversity: University[]
  checkedItemsArr: string[]
  semiFinalUniversitis: University[]
  altArr: University[]
}

export const selectDepartmentSystem = ({
  afterDevisionUniversity,
  checkedItemsArr,
  semiFinalUniversitis,
  altArr,
}: DepartmentSystemProps) => {
  // DepartmentArrに一致する項目がチェックされているか確認
  const departmentMatched = checkedItemsArr.some((checkedId) => {
    // DepartmentArr内の要素を一つ一つ確認する
    return DepartmentArr.some((departmentGroup) =>
      departmentGroup.includes(checkedId),
    )
  })

  // チェックされた項目のいずれもDepartmentArrに含まれない場合の処理
  if (!departmentMatched) {
    console.log('選択された学科がDepartmentArrのいずれにも一致しませんでした')
    afterDevisionUniversity.map((univer) => {
      altArr.push(univer)
      semiFinalUniversitis.push(univer)
    })
    return semiFinalUniversitis
  }

  for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
    afterDevisionUniversity.map((univer) => {
      if (checkedItemsArr[checkedId] === univer.department_system) {
        console.log('一致しました')
        altArr.push(univer)
        semiFinalUniversitis.push(univer)
      }
    })
  }
  return semiFinalUniversitis
}
