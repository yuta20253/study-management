import { Dispatch, SetStateAction } from 'react'

export type StudyHoursProps = {
  title: string
  subject: string
  study_type: string
  actual_learning_time: number
  created_at: Date
}

export type StudyGraphDataProps = {
  studyData: StudyHoursProps[]
  title: string
  secondModalOpen: boolean
  setSecondModalOpen: Dispatch<SetStateAction<boolean>>
  setForModalSubject: Dispatch<SetStateAction<string>>
}
