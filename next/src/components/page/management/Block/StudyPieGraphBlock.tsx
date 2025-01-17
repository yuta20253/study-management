import { Dispatch, SetStateAction } from 'react'
import StudyPieGraph from '@/components/page/management/Graph/studyPie'
import { StudyHoursProps } from '@/types/Management'
type StudyPieGraphBlockProps = {
  studyHours: StudyHoursProps[]
  title: string
  secondModalOpen: boolean
  setSecondModalOpen: Dispatch<SetStateAction<boolean>>
  setForModalSubject: Dispatch<SetStateAction<string>>
}

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
