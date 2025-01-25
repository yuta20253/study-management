import { Dispatch, SetStateAction } from 'react'
import { DepartmentArr } from '@/const/departmentArr'

export const useClearSelectCheckBoxesHandlers = (
  setCheckedItems: Dispatch<SetStateAction<string[]>>,
  setDeviationValues: Dispatch<SetStateAction<number[]>>,
) => {
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

  return {
    handleClearInstallationCategory,
    handleClearCommonEntranceExaminationSunjects,
    handleClearSecondEntranceExaminationSunjects,
    handleClearFacultySystem,
    handleClearDeviationValues,
  }
}
