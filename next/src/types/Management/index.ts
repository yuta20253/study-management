export type StudyHoursProps = {
  title: string
  subject: string
  study_type: string
  actual_learning_time: number
  created_at: Date
  todo_id: number
  todo: {
    id: number
    title: string
    progress: string
    user_id: number
  }
}
