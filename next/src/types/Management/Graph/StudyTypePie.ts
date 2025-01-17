export type StudyHoursProps = {
  study_type: string
  actual_learning_time: number
}

export type StudyGraphDataProps = {
  studyData: StudyHoursProps[]
  title: string
}
