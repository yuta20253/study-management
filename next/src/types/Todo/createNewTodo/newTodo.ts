export type TodoProps = {
  id: number
  subject: string
  title: string
  description: string
  progress: string
  study_type: string
  scheduled_study_time: number
  actual_learning_time: number
  due_date: Date
  importance: number
  star_rating: number
}

export type ClickProps = {
  onClose: () => void
}
