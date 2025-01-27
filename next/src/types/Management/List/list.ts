import { ChangeEvent } from 'react'
import { StudyHoursProps } from '..'
import {
  SelectGraphProps,
  SelectSubjectProps,
  SelectPeriodProps,
  SelectStudyTypeProps,
} from '../selectType'

export type Management = {
  studyHours: StudyHoursProps[] | undefined
  selectedSubject: string
  selectedPeriod: Date
  studyType: string
  onOpen: () => void
  handleClickStudy: (study: StudyHoursProps) => void
}

export type SelectDisplayGraphProps = {
  SelectGraph: React.FC<SelectGraphProps> // Changed to React.FC for component type
  SelectSubject: React.FC<SelectSubjectProps>
  SelectPeriod: React.FC<SelectPeriodProps>
  SelectStudyType: React.FC<SelectStudyTypeProps>
  handleSelectGraph: (event: ChangeEvent<HTMLSelectElement>) => void
  handleSelectSubject: (event: ChangeEvent<HTMLSelectElement>) => void
  handleChangeDisplayPeriod: (event: ChangeEvent<HTMLSelectElement>) => void
  handleCreatePeriod: (event: ChangeEvent<HTMLSelectElement>) => void
  handleChangeStudyType: (event: ChangeEvent<HTMLSelectElement>) => void
  subjectName: string
  selectSubject: JSX.Element[] // Array of JSX elements, could be adjusted
  displiedPeriod: string
  selectPeriodLists: JSX.Element[] // Array of JSX elements
  studyType: string
  selectStudyType: JSX.Element[] // Array of JSX elements
}
