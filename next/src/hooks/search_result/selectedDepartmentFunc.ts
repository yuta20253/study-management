import { MutableRefObject } from 'react'
import { selectFirstExamSubjects } from '@/hooks/search_result/selectFirstExamSubjects'
import { selectSecondExamSubjects } from '@/hooks/search_result/selectSecondExamSubjects'
import { SelectedDepartmentFuncProps, University } from '@/types/SearchResult'

export const selectedDepartmentFunc = (
  jsonUniversity: University[],
  checkedItems: string | undefined,
  deviationValuesArr: string,
  firstTrueOrFalse: MutableRefObject<number | undefined>,
  secondTrueOrFalse: MutableRefObject<number | undefined>,
  selectableUniversities: string[],
): SelectedDepartmentFuncProps => {
  console.log(jsonUniversity.length)

  console.log('選択されていた項目', checkedItems)
  console.log('選択されていた偏差値の範囲', deviationValuesArr)

  let checkedItemsArr: string[] = []
  if (checkedItems !== undefined) {
    checkedItemsArr = checkedItems
      .replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
      .split(',')
    console.log('###################')
    //console.log(jsonUniversity)
  }

  let deviationValuesList: string[] = []
  if (deviationValuesArr !== null) {
    deviationValuesList = deviationValuesArr
      .replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
      .split(',')
    console.log('###################')
    console.log(deviationValuesList)
    console.log(deviationValuesList.length)
  }

  const altArr: University[] = []
  const semiFinalUniversitis: University[] = []
  const finalCommonSelectedUniversities: University[] = []
  const finalSecondSelectedUniversities: University[] = []
  const returnUniversities: University[] = []
  const isAllIncludes = (arr: string[], target: string[]) =>
    arr.every((elm: string) => target.includes(elm))

  // 「設置区分」だけ選択している(checkedItemsArrに「国・私」しか格納されていない)
  // 「国立」を選択している場合
  if (
    checkedItemsArr.length === 2 &&
    isAllIncludes(checkedItemsArr, ['国立', '私立'])
  ) {
    console.log('設置区分のみが選択されました')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity.map((univer) => {
        if (checkedItemsArr[checkedId] === univer.division) {
          console.log('一致しました')
          altArr.push(univer)
          semiFinalUniversitis.push(univer)
        }
      })
    }
  } else if (checkedItemsArr.length === 1 && checkedItemsArr.includes('国立')) {
    console.log('設置区分「国立」のみが選択されました')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity.map((univer) => {
        if (univer.division === '国立') {
          console.log('一致しました')
          altArr.push(univer)
          semiFinalUniversitis.push(univer)
        }
      })
    }
  } else if (checkedItemsArr.length === 1 && checkedItemsArr.includes('私立')) {
    console.log('設置区分「私立」のみが選択されました')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity.map((univer) => {
        if (univer.division === '私立') {
          console.log('一致しました')
          altArr.push(univer)
          semiFinalUniversitis.push(univer)
        }
      })
    }
  } else if (
    checkedItemsArr.includes('国立') &&
    !checkedItemsArr.includes('私立')
  ) {
    console.log('国立が選ばれました')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity
        .filter((univer) => {
          return univer.division === '国立'
        })
        .map((univer) => {
          if (checkedItemsArr[checkedId] === univer.department_system) {
            console.log('一致しました')
            altArr.push(univer)
            semiFinalUniversitis.push(univer)
          }
        })
    }
  } else if (
    checkedItemsArr.includes('私立') &&
    !checkedItemsArr.includes('国立')
  ) {
    // 「私立」を選択している場合
    console.log('私立が選ばれました')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity
        .filter((univer) => {
          return univer.division === '私立'
        })
        .map((univer) => {
          if (checkedItemsArr[checkedId] === univer.department_system) {
            console.log('一致しました')
            altArr.push(univer)
            semiFinalUniversitis.push(univer)
          }
        })
    }
  } else if (
    checkedItemsArr.includes('私立') &&
    checkedItemsArr.includes('国立')
  ) {
    // 「国立・私立」両方を選択している場合
    console.log('国私の両方選択されています')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity.map((univer) => {
        if (checkedItemsArr[checkedId] === univer.department_system) {
          console.log('一致しました')
          altArr.push(univer)
          semiFinalUniversitis.push(univer)
        }
      })
    }
  } else if (
    !checkedItemsArr.includes('私立') &&
    !checkedItemsArr.includes('国立') &&
    checkedItemsArr.length < 1
  ) {
    // 「国立・私立」両方とも選択していない場合
    console.log('国私の選択がされていません')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity.map((univer) => {
        if (checkedItemsArr[checkedId] === univer.department_system) {
          console.log('一致しました')
          altArr.push(univer)
          semiFinalUniversitis.push(univer)
        }
      })
    }
  } else {
    // 「国立・私立」両方を選択しているか、両方とも選択していない場合で「学部系統」の選択をしていない場合
    console.log('国私の選択がされていません。学部系統も選ばれていません')
    for (let checkedId = 0; checkedId < checkedItemsArr.length; checkedId++) {
      jsonUniversity.map((univer) => {
        altArr.push(univer)
        semiFinalUniversitis.push(univer)
      })
    }
  }

  semiFinalUniversitis.map((uni) => {
    console.log(
      `科目を選択する前まで合致している大学:::::${uni.university}大学${uni.faculty}学部${uni.department}学科`,
    )
  })
  altArr.map((uni) => {
    console.log(
      `科目を選択する前まで合致している大学:::::${uni.university}大学${uni.faculty}学部${uni.department}学科`,
    )
  })
  console.log(semiFinalUniversitis.length)

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
    //altArr.map((altElm) => {
    //if (Object.keys(altElm).indexOf('first_exam_subjects') == -1) {
    //finalCommonSelectedUniversities.push(altElm)
    //}
    //})
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
    //altArr.map((altElm) => {
    //if (Object.keys(altElm).indexOf('first_exam_subjects') == -1) {
    //finalCommonSelectedUniversities.push(altElm)
    //}
    //})
  } else {
    semiFinalUniversitis.map((university) =>
      finalSecondSelectedUniversities.push(university),
    )
  }

  console.log(
    `firstTrueOrFalse:::::${firstTrueOrFalse.current}::::::secondTrueOrFalse:::::${secondTrueOrFalse.current}`,
  )

  const toDisplayMixArr: University[] = []
  if (firstTrueOrFalse.current !== null && secondTrueOrFalse.current !== null) {
    console.log('1が選ばれました')
    finalCommonSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
    finalSecondSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  } else if (
    firstTrueOrFalse.current !== null &&
    secondTrueOrFalse.current === null
  ) {
    console.log('2が選ばれました')
    finalCommonSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  } else if (
    firstTrueOrFalse.current === null &&
    secondTrueOrFalse.current !== null
  ) {
    console.log('3が選ばれました')
    finalSecondSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  } else {
    console.log('4が選ばれました')
    finalCommonSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
    finalSecondSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  }

  console.log(toDisplayMixArr)

  const displayUniversities: University[] = [...new Set(toDisplayMixArr)]

  console.log(displayUniversities)

  return { displayUniversities, deviationValuesList }
}
