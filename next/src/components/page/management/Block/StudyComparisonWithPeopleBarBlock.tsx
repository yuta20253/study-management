import StudyComparisonWithPeopleBar from '@/components/page/management/Graph/studyComparisonＷithPeopleBar'
import { StudyHoursProps } from '@/types/Management'
type StudyComparisonWithPeopleBarBlockProps = {
  studyData: StudyHoursProps[]
  title: string
  followers: number
}
export const StudyComparisonWithPeopleBarBlock = ({
  studyData,
  title,
  followers,
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
        followers={followers}
      />
    </div>
  )
}
