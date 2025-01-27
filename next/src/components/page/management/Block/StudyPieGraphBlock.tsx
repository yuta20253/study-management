import StudyPieGraph from '@/components/page/management/Graph/studyPie'
import { StudyPieGraphBlockProps } from '@/types/Management/Block/block'

export const StudyPieGraphBlock = ({
  studyHours,
  title,
  secondModalOpen,
  setSecondModalOpen,
  setForModalSubject,
}: StudyPieGraphBlockProps) => {
  return (
    <div
      style={{
        width: 600,
        height: 300,
        border: '1px solid #000000',
      }}
      className="mr-2"
    >
      <StudyPieGraph
        studyData={studyHours}
        title={`${title}`}
        secondModalOpen={secondModalOpen}
        setSecondModalOpen={setSecondModalOpen}
        setForModalSubject={setForModalSubject}
      />
    </div>
  )
}
