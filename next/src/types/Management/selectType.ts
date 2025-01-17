import { ChangeEvent } from 'react'

export type ChangesInStudytTimeBySubjectProps = {
  subjectName: string
  selectSubject: JSX.Element[]
  handleSelectSubjectName: (event: ChangeEvent<HTMLSelectElement>) => void
}

export type SelectGraphProps = {
  handleSelectGraph: (event: ChangeEvent<HTMLSelectElement>) => void
}

export type SelectPeriodProps = {
  displiedPeriod: string
  selectPeriodLists: JSX.Element[]
  handleChangeDisplayPeriod: (event: ChangeEvent<HTMLSelectElement>) => void
  handleCreatePeriod: (event: ChangeEvent<HTMLSelectElement>) => void
}

export type SelectStudyTypeProps = {
  studyType: string
  handleChangeStudyType: (event: ChangeEvent<HTMLSelectElement>) => void
  selectStudyType: JSX.Element[]
}

export type SelectSubjectProps = {
  subjectName: string
  handleSelectSubject: (event: ChangeEvent<HTMLSelectElement>) => void
  selectSubject: JSX.Element[]
}
