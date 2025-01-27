import { ChangesInStudytTimeBySubject } from '@/components/page/management/Select/ChangesInStudytTimeBySubject'
import { ChangesInStudytTimeBySubjectBlockProps } from '@/types/Management/Block/block'

export const ChangesInStudytTimeBySubjectBlock = ({
  subjectName,
  selectSubject,
  handleSelectSubjectName,
}: ChangesInStudytTimeBySubjectBlockProps) => {
  return (
    <div className="mt-4 flex w-3/4 items-center justify-end">
      <div className="">
        <ChangesInStudytTimeBySubject
          subjectName={subjectName}
          selectSubject={selectSubject}
          handleSelectSubjectName={handleSelectSubjectName}
        />
      </div>
    </div>
  )
}
