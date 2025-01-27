import SubjectStudyTimeLine from '@/components/page/management/Graph/subjectStudyTimeLine'
import { SubjectStudyTimeLineBlockProps } from '@/types/Management/Block/block'

export const SubjectStudyTimeLineBlock = ({
  studyData,
  title,
  subjectName,
  sentlabels,
}: SubjectStudyTimeLineBlockProps) => {
  return (
    <div
      style={{
        width: 600,
        height: 300,
        border: '1px solid #000000',
      }}
    >
      <SubjectStudyTimeLine
        studyData={studyData}
        title={title}
        subjectName={subjectName}
        sentlabels={sentlabels}
      />
    </div>
  )
}
