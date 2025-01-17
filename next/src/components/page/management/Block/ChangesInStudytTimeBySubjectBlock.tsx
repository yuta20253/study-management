import { ChangeEvent } from 'react'
import { ChangesInStudytTimeBySubject } from '@/components/page/management/Select/ChangesInStudytTimeBySubject'
type ChangesInStudytTimeBySubjectBlockProps = {
  subjectName: string
  selectSubject: JSX.Element[]
  handleSelectSubjectName: (event: ChangeEvent<HTMLSelectElement>) => void
}

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
