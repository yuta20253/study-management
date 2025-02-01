import { NextPage } from 'next'
import { ErrorToFetchData } from '@/components/ErrorToFetchData'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import LinkButton from '@/components/page/Common/LinkButton'
import { ScoreOfExam } from '@/components/page/schools/faculty/score_of_exam'
import { DataState } from '@/hooks/schools/details/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const FacultyDetails: NextPage = () => {
  useRequireSignedIn()
  const { facultyData, school_id, error } = DataState()
  if (!facultyData) return <ErrorToFetchData />
  if (error) {
    return (
      <ErrorTemplate
        error={error}
        href={`/current/schools/${school_id}`}
        text={'学部一覧へ'}
      />
    )
  }
  return (
    <div className="w-full">
      <div className="mt-5 flex items-center justify-center">
        <ScoreOfExam faculty={facultyData} />
      </div>

      <div className="mt-5 flex w-full items-center justify-center gap-5">
        <LinkButton href={`/current/schools/${school_id}`} text={'前に戻る'} />
        <LinkButton
          href={'/current/desired_schools/search/option'}
          text={'各種検索へ'}
        />
      </div>
    </div>
  )
}

export default FacultyDetails
