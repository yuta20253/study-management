import { ChangeEvent } from 'react'
import {
  SelectGraphProps,
  SelectSubjectProps,
  SelectPeriodProps,
  SelectStudyTypeProps,
} from '@/types/Management/selectType'

type SelectDisplayGraphProps = {
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

export const SelectDisplayGraph: React.FC<SelectDisplayGraphProps> = ({
  SelectGraph,
  SelectSubject,
  SelectPeriod,
  SelectStudyType,
  subjectName,
  selectSubject,
  displiedPeriod,
  selectPeriodLists,
  studyType,
  selectStudyType,
  handleSelectGraph,
  handleSelectSubject,
  handleChangeDisplayPeriod,
  handleCreatePeriod,
  handleChangeStudyType,
}: SelectDisplayGraphProps) => {
  return (
    <div>
      <SelectGraph handleSelectGraph={handleSelectGraph} />
      <SelectSubject
        subjectName={subjectName}
        handleSelectSubject={handleSelectSubject}
        selectSubject={selectSubject}
      />
      <SelectPeriod
        displiedPeriod={displiedPeriod}
        selectPeriodLists={selectPeriodLists}
        handleChangeDisplayPeriod={handleChangeDisplayPeriod}
        handleCreatePeriod={handleCreatePeriod}
      />
      <SelectStudyType
        studyType={studyType}
        handleChangeStudyType={handleChangeStudyType}
        selectStudyType={selectStudyType}
      />
    </div>
  )
}
