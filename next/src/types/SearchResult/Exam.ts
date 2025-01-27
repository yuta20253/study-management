import { MutableRefObject } from 'react'

export type University = {
  code: number
  region: string
  undergraduate_system: string
  university: string
  faculty: string
  department: string
  deviation_value: string
  location: string
  faculty_of_code: number
  explanation: string
  capacity: string
  division: string
  department_system: string
  first_exam_subjects: [
    {
      english: string
      math: string
      nationallang: string
      science: string
      geographical_history_citizens: string
      information: string
    },
  ]

  second_exam_subjects: [
    {
      english: string
      math: string
      nationallang: string
      science: string
      geographical_history_citizens: string
      information: string
      essay: string
      practical_skills: string //実技
      comprehensive_question: string //総合問題
      certification_exam: string //英語資格・検定試験
    },
  ]
}

export type ExamSubjectProps = {
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
