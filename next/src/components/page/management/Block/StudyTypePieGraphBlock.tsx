import StudyTypePieGraph from '@/components/page/management/Graph/studyTypePie'
import { StudyTypePieGraphBlockProps } from '@/types/Management/Block/block'

export const StudyTypePieGraphBlock = ({
  title,
  studyHours,
}: StudyTypePieGraphBlockProps) => {
  return (
    <div
      style={{
        width: 600,
        height: 300,
        border: '1px solid #000000',
      }}
    >
      <StudyTypePieGraph studyData={studyHours} title={title} />
    </div>
  )
}
