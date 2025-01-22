import { useRouter } from 'next/router'
import { useState, ChangeEvent, useEffect } from 'react'
import { DepartmentArr } from '@/const/departmentArr'

export const DataState = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [deviationValues, setDeviationValues] = useState<number[]>([35.0, 75.0])

  useEffect(() => {
    console.log(`checkedItems:::::${checkedItems}`)
  }, [checkedItems])
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value

    setCheckedItems((prev) => {
      if (prev.includes(name)) {
        // チェックが入っている場合は削除
        const newArr = prev.filter((item) => item !== name)
        console.log('newArr:', newArr)
        return newArr
      } else {
        // チェックが入っていない場合は追加
        return [...prev, name]
      }
    })
  }

  const handleClearInstallationCategory = () => {
    setCheckedItems((prev) => {
      return prev.filter((item) => item !== '国立' && item !== '私立')
    })
  }

  const handleClearCommonEntranceExaminationSunjects = () => {
    setCheckedItems((prev) => {
      return prev.filter(
        (item) =>
          item !== 'first_exam_subjects.english' &&
          item !== 'first_exam_subjects.math' &&
          item !== 'first_exam_subjects.nationallang' &&
          item !== 'first_exam_subjects.science' &&
          item !== 'first_exam_subjects.geographical_history_citizens' &&
          item !== 'first_exam_subjects.information' &&
          item !== 'first_exam_subjects.essay' &&
          item !== 'first_exam_subjects.comprehensive_question' &&
          item !== 'first_exam_subjects.certification_exam',
      )
    })
  }

  const handleClearSecondEntranceExaminationSunjects = () => {
    setCheckedItems((prev) => {
      return prev.filter(
        (item) =>
          item !== 'second_exam_subjects.english' &&
          item !== 'second_exam_subjects.math' &&
          item !== 'second_exam_subjects.nationallang' &&
          item !== 'second_exam_subjects.science' &&
          item !== 'second_exam_subjects.geographical_history_citizens' &&
          item !== 'second_exam_subjects.information' &&
          item !== 'second_exam_subjects.essay' &&
          item !== 'second_exam_subjects.comprehensive_question' &&
          item !== 'second_exam_subjects.certification_exam',
      )
    })
  }

  const allDepartments = DepartmentArr.flat()

  const handleClearFacultySystem = () => {
    setCheckedItems((prev) => {
      return prev.filter((item) => !allDepartments.includes(item))
    })
  }

  const handleClearDeviationValues = () => {
    setDeviationValues([35.0, 75.0])
  }

  const deviationValuesLists = (deviationValuesArr: number[]) => {
    const newValues = []
    let value = deviationValuesArr[0]
    while (value <= deviationValuesArr[1]) {
      newValues.push(value)
      value += 2.5
    }
    return newValues
  }

  return {
    checkedItems,
    setCheckedItems,
    deviationValues,
    setDeviationValues,
    router,
    handleChange,
    handleClearInstallationCategory,
    deviationValuesLists,
    handleClearDeviationValues,
    handleClearFacultySystem,
    handleClearCommonEntranceExaminationSunjects,
    handleClearSecondEntranceExaminationSunjects,
  }
}
