export type Faculty = {
  faculty_data: {
    code: number
    faculty_of_code: number
    region: string
    undergraduate_system: string
    university: string
    faculty: string
    department: string
    deviation_value: string
    location: string
    explanation: string
    capacity: string
    division: string
    first_exam_subjects: [
      {
        english: string
        math: string
        nationallang: string
        science: string
        geographical_history_citizens: string
        information: string
        english_alternative?: string
        math_alternative?: string
        nationallang_alternative?: string
        science_alternative?: string
        geographical_history_citizens_alternative?: string
        information_alternative?: string
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
        english_alternative?: string
        math_alternative?: string
        nationallang_alternative?: string
        science_alternative?: string
        geographical_history_citizens_alternative?: string
        information_alternative?: string
      },
    ]
  }
}

export type FacultyProps = {
  faculty: Faculty
}
