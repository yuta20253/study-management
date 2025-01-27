import { Dispatch, SetStateAction } from 'react'

export type StudyHours = {
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
  }
}

export type StudyHistoryProps = {
  studyLists: StudyHours[]
  title: string
  todo_id: number
  onClose: () => void
}

export type StudyHoursProps = {
  title: string
  subject: string
  study_type: string
  actual_learning_time: number
  created_at: Date
}

export type SubjectHistoryProps = {
  subjectLists: StudyHoursProps[]
  subject: string
  setSecondModalOpen: Dispatch<SetStateAction<boolean>>
}
