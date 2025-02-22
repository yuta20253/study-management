import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { StudyHoursProps } from '..'

export type ChangesInStudytTimeBySubjectBlockProps = {
  subjectName: string
  selectSubject: JSX.Element[]
  handleSelectSubjectName: (event: ChangeEvent<HTMLSelectElement>) => void
}

export type SelectedItemsListsBlockProps = {
  handleSelectGraph: (event: ChangeEvent<HTMLSelectElement>) => void
  subjectName: string
  handleSelectSubject: (event: ChangeEvent<HTMLSelectElement>) => void
  selectSubject: JSX.Element[]
  displiedPeriod: string
  selectPeriodLists: JSX.Element[]
  handleChangeDisplayPeriod: (event: ChangeEvent<HTMLSelectElement>) => void
  handleCreatePeriod: (event: ChangeEvent<HTMLSelectElement>) => void
  studyType: string
  handleChangeStudyType: (event: ChangeEvent<HTMLSelectElement>) => void
  selectStudyType: JSX.Element[]
}

export type StudyComparisonWithPeopleBarBlockProps = {
  studyData: StudyHoursProps[]
  title: string
  numberOfUsers: number
}

export type StudyPieGraphBlockProps = {
  studyHours: StudyHoursProps[]
  title: string
  secondModalOpen: boolean
  setSecondModalOpen: Dispatch<SetStateAction<boolean>>
  setForModalSubject: Dispatch<SetStateAction<string>>
}

export type StudyTypePieGraphBlockProps = {
  title: string
  studyHours: StudyHoursProps[]
}

export type SubjectStudyTimeLineBlockProps = {
  studyData: StudyHoursProps[]
  title: string
  subjectName: string
  sentlabels: string[]
}
