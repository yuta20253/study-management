import { ChangeEvent } from 'react'

export type CommonEntranceExaminationSubjectsAccordionProps = {
  entranceExamination: string
  foreignLanguage: string
  math: string
  nationallang: string
  science: string
  geographical_history_citizens: string
  information: string
  essay: string
  practical_skills: string //実技
  comprehensive_question: string //総合問題
  certification_exam: string //英語資格・検定試験
}

export type FacultyAccordionProps = {
  facultySystem: string
  departmentArr: string[]
  keyNum: number
}

export type InstallationCategoryProps = {
  nationalSchool: string
  privateSchool: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleClearInstallationCategory: () => void
  checkedItems: string[]
}

export type SecondEntranceExaminationSubjectsAccordionProps = {
  entranceExamination: string
  foreignLanguage: string
  math: string
  nationallang: string
  science: string
  geographical_history_citizens: string
  information: string
  essay: string
  practical_skills: string //実技
  comprehensive_question: string //総合問題
  certification_exam: string //英語資格・検定試験
}

export type DeviationValueAccordionProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}
