import { NextPage } from 'next'
import LinkButton from '@/components/page/Common/LinkButton'
import { ScoreOfExam } from '@/components/page/schools/faculty/score_of_exam'
import { DataState } from '@/hooks/schools/Edit/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const FacultyDetails: NextPage = () => {
  useRequireSignedIn()
  const { facultyData, school_id } = DataState()
  if (!facultyData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-xl sm:text-2xl md:text-3xl">
          データの取得に失敗しました
        </div>
      </div>
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
