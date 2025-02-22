import { NextPage } from 'next'
import Link from 'next/link'
import { ErrorToFetchData } from '@/components/ErrorToFetchData'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import { SchoolDataTable } from '@/components/page/schools/SchoolId/DataTable/SchoolDataTable'
import { useDataState } from '@/hooks/schools/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const ShowUniversityData: NextPage = () => {
  useRequireSignedIn()
  const { university, school_id, error } = useDataState()

  if (!university) return <ErrorToFetchData />
  if (error) {
    return (
      <ErrorTemplate
        error={error}
        href={'/current/desired_schools/search'}
        text={'検索方法へ'}
      />
    )
  }
  const showUniversity = university['uni']['school']
  const universityLength: number = university['uni']['data'].length

  return (
    <div className="flex w-full justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full items-center justify-center sm:w-3/4 lg:w-1/2">
        <h1 className="mt-5 h-10 bg-sky-700">
          <p className="my-1 h-8 p-1 text-center text-xl text-white">
            大学詳細
          </p>
        </h1>
        <div className="w-full items-center justify-center">
          <h2 className="h-8">
            <p className="my-1 h-8 p-1 text-center text-xl sm:text-2xl">
              {showUniversity}
            </p>
          </h2>
        </div>
        <div className="mb-5 w-full items-center justify-center">
          <h2 className="h-8">
            <p className="my-1 h-8 p-1 text-center text-xl sm:text-2xl">
              学部学科
            </p>
          </h2>
        </div>
        <div className="w-full items-center justify-center">
          <SchoolDataTable
            university={university}
            universityLength={universityLength}
            school_id={school_id}
          />
        </div>
        <div className="mt-5 flex w-full items-center justify-end">
          <button className="rounded bg-sky-500 px-3 py-2 text-sm text-white sm:text-base">
            <Link href="/current/desired_schools">前に戻る</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowUniversityData
