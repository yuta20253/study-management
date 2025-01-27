import { Dispatch, SetStateAction } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import { EditTodoProps } from '..'

export type ActualLearningTimeProps = {
  theme: string
  actualLearningTime: string
  registerActualLearningTime: string
  setScheduledStudyTime: Dispatch<SetStateAction<string>>
  setActualLearningTime: Dispatch<React.SetStateAction<string>>
  setTotalHour: Dispatch<SetStateAction<number>>
  handleChangeHours: (event: string) => void
  rules?: {
    required: string
    min: { value: number; message: string } // Add min validation
    max: { value: number; message: string } // Add max validation
  }
  error?: FieldError
}

export type DescriptionProps = {
  theme: string
  props: string
  registerDescription: string
  setDescription: Dispatch<SetStateAction<string>>
  rules?: {
    maxLength: { value: number; message: string }
  }
  error?: FieldError
}

export type DueDateProps = {
  theme: string
  props: string
  setDueDate: Dispatch<SetStateAction<string>>
  registerDueDate: string
  error?: FieldError
}

export type ImportanceProps = {
  theme: string
  props: string
  registerImportance: string
  setImportance: Dispatch<SetStateAction<string>>
}

export type ProgressProps = {
  theme: string
  props: string
}

export type ScheduledStudyTimeProps = {
  theme: string
  props: string
}

export type StarValuesProps = {
  theme: string
  props: number
  setSelectedStars: Dispatch<SetStateAction<number>>
}

export type StudyTypeProps = {
  theme: string
  props: string
}

export type SubjectProps = {
  theme: string
  props: string
}

export type TitleProps = {
  theme: string
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  registerTitle: string
  rules?: {
    required: string
  }
  error?: FieldError
}

export type TotalHourProps = {
  theme: string
  props: number
}

export type TodoInfo = {
  subject: string
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  studyType: string
  scheduledStudyTime: string
  actualLearningTime: string
  setScheduledStudyTime: Dispatch<React.SetStateAction<string>>
  setActualLearningTime: Dispatch<React.SetStateAction<string>>
  setTotalHour: Dispatch<SetStateAction<number>>
  handleChangeHours: (event: string) => void
  totalHour: number
  progress: string
  dueDate: string
  setDueDate: Dispatch<React.SetStateAction<string>>
  importance: string
  setImportance: Dispatch<React.SetStateAction<string>>
  selectedStars: number
  setSelectedStars: Dispatch<React.SetStateAction<number>>
  description: string
  setDescription: Dispatch<React.SetStateAction<string>>
  errors: FieldErrors<EditTodoProps>
}
