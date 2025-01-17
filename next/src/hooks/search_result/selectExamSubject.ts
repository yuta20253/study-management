import { MutableRefObject } from 'react'
import { University } from '@/types/SearchResult'

type ExamSubjectProps = {
  checkedItemsArr: string[]
  firstTrueOrFalse: MutableRefObject<number | undefined>
  secondTrueOrFalse: MutableRefObject<number | undefined>
  selectFirstExamSubjects(
    universities: University[],
    checkedSubjects: string[],
    selectableUniversities: string[],
    returnUniversities: University[] | undefined,
    exam_subjects: string,
  ): University[]
  selectSecondExamSubjects(
    universities: University[],
    checkedSubjects: string[],
    selectableUniversities: string[],
    returnUniversities: University[] | undefined,
    exam_subjects: string,
  ): University[]
  finalCommonSelectedUniversities: University[]
  finalSecondSelectedUniversities: University[]
  altArr: University[]
  selectableUniversities: string[]
  returnUniversities: University[]
  semiFinalUniversitis: University[]
}

export const selectExamSubject = ({
  checkedItemsArr,
  firstTrueOrFalse,
  secondTrueOrFalse,
  selectFirstExamSubjects,
  selectSecondExamSubjects,
  finalCommonSelectedUniversities,
  finalSecondSelectedUniversities,
  altArr,
  selectableUniversities,
  returnUniversities,
  semiFinalUniversitis,
}: ExamSubjectProps) => {
  if (semiFinalUniversitis.length === 0) {
    return
  }
  // ここから上のsemiFinalUniversitisに対して科目で大学を絞る作業
  // 選択リストの中に「first_exam_subjects」が付いているものがある場合
  const firstPrifix = 'first_exam_subjects.'
  const secondPrifix = 'second_exam_subjects.'
  checkedItemsArr.map((checkedElm) => {
    if (!checkedElm.indexOf(firstPrifix)) {
      firstTrueOrFalse.current = 1
    }
  })
  if (firstTrueOrFalse.current !== null) {
    console.log(firstTrueOrFalse)
    console.log('if文に入りました')
    selectFirstExamSubjects(
      altArr,
      checkedItemsArr,
      selectableUniversities,
      returnUniversities,
      firstPrifix,
    )
    returnUniversities.map((university) => {
      console.log(
        `戻り値の値:::::${university.university}大学${university.faculty}学部${university.department}学科`,
      )
      finalCommonSelectedUniversities.push(university)
    })
  } else {
    semiFinalUniversitis.map((university) =>
      finalCommonSelectedUniversities.push(university),
    )
  }

  console.log('###################')
  selectableUniversities.map((s) =>
    console.log(`該当科目で受験できる大学詳細:::::${s}`),
  )
  console.log(selectableUniversities.length)
  console.log('###################')

  // 選択リストの中に「second_exam_subjects」が付いているものがある場合
  checkedItemsArr.map((checkedElm) => {
    if (!checkedElm.indexOf(secondPrifix)) {
      secondTrueOrFalse.current = 1
    }
  })
  if (secondTrueOrFalse.current !== null) {
    console.log(secondTrueOrFalse)
    console.log('if文に入りました')
    selectSecondExamSubjects(
      altArr,
      checkedItemsArr,
      selectableUniversities,
      returnUniversities,
      secondPrifix,
    )
    returnUniversities.map((university) => {
      console.log(
        `戻り値の値:::::${university.university}大学${university.faculty}学部${university.department}学科`,
      )
      finalSecondSelectedUniversities.push(university)
    })
  } else {
    semiFinalUniversitis.map((university) =>
      finalSecondSelectedUniversities.push(university),
    )
  }

  return {
    finalCommonSelectedUniversities,
    finalSecondSelectedUniversities,
    firstTrueOrFalse,
    secondTrueOrFalse,
  }
}
