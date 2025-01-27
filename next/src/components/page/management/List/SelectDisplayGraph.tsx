import { SelectDisplayGraphProps } from '@/types/Management/List/list'

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
