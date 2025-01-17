import { University } from '@/types/SearchResult'

type DivisionProps = {
  jsonUniversity: University[]
  checkedItemsArr: string[]
  afterDevisionUniversity: University[]
}

export const selectDivision = ({
  jsonUniversity,
  checkedItemsArr,
  afterDevisionUniversity,
}: DivisionProps) => {
  if (checkedItemsArr.includes('国立') && checkedItemsArr.includes('私立')) {
    jsonUniversity.forEach((university) =>
      afterDevisionUniversity.push(university),
    )
  } else if (checkedItemsArr.includes('国立')) {
    jsonUniversity.map((university) => {
      if (university.division === '国立') {
        afterDevisionUniversity.push(university)
      }
    })
  } else if (checkedItemsArr.includes('私立')) {
    jsonUniversity.map((university) => {
      if (university.division === '私立') {
        afterDevisionUniversity.push(university)
      }
    })
  } else {
    jsonUniversity.forEach((university) =>
      afterDevisionUniversity.push(university),
    )
  }

  return afterDevisionUniversity
}
