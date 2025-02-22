import StudyComparisonWithPeopleBar from '@/components/page/management/Graph/studyComparisonＷithPeopleBar'
import { StudyComparisonWithPeopleBarBlockProps } from '@/types/Management/Block/block'

export const StudyComparisonWithPeopleBarBlock = ({
  studyData,
  title,
  numberOfUsers,
}: StudyComparisonWithPeopleBarBlockProps) => {
  return (
    <div
      style={{
        width: 600,
        height: 300,
        border: '1px solid #000000',
      }}
    >
      <StudyComparisonWithPeopleBar
        studyData={studyData}
        title={title}
        numberOfUsers={numberOfUsers}
      />
    </div>
  )
}
