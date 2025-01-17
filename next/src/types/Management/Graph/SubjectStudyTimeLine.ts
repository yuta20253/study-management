export type StudyHoursProps = {
  title: string
  subject: string
  study_type: string
  actual_learning_time: number
  created_at: Date
}

export type StudyTimesProps = {
  studyData: StudyHoursProps[]
  title: string
  subjectName: string
  sentlabels: string[]
}

export type HoursOfDate = {
  date: string
  subject: string
  time: number
}
