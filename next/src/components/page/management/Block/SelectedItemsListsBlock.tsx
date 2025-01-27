import { SelectGraph } from '@/components/page/management/Select/SelectGraph'
import { SelectPeriod } from '@/components/page/management/Select/SelectPeriod'
import { SelectStudyType } from '@/components/page/management/Select/SelectStudyType'
import { SelectSubject } from '@/components/page/management/Select/SelectSubject'
import { SelectedItemsListsBlockProps } from '@/types/Management/Block/block'

export const SelectedItemsListsBlock = ({
  handleSelectGraph,
  subjectName,
  handleSelectSubject,
  selectSubject,
  displiedPeriod,
  selectPeriodLists,
  handleChangeDisplayPeriod,
  handleCreatePeriod,
  studyType,
  handleChangeStudyType,
  selectStudyType,
}: SelectedItemsListsBlockProps) => {
  return (
    <div className="relative mt-4 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="w-full sm:w-auto">
        <SelectGraph handleSelectGraph={handleSelectGraph} />
      </div>
      <div className="w-full sm:w-auto">
        <SelectSubject
          subjectName={subjectName}
          handleSelectSubject={handleSelectSubject}
          selectSubject={selectSubject}
        />
      </div>
      <div className="w-full sm:w-auto">
        <SelectPeriod
          displiedPeriod={displiedPeriod}
          selectPeriodLists={selectPeriodLists}
          handleChangeDisplayPeriod={handleChangeDisplayPeriod}
          handleCreatePeriod={handleCreatePeriod}
        />
      </div>
      <div className="w-full sm:w-auto">
        <SelectStudyType
          studyType={studyType}
          handleChangeStudyType={handleChangeStudyType}
          selectStudyType={selectStudyType}
        />
      </div>
    </div>
  )
}
