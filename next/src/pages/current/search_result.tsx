import { NextPage } from 'next'
import Link from 'next/link'
import { LoadingScreen } from '@/components/Loading'
import LinkButton from '@/components/page/Common/LinkButton'
import { DepartmentSearchResultData } from '@/components/page/searchResult/TableRow/DepartmentSearchResultData'
import { Head } from '@/components/page/searchResult/TableRow/Head'
import { DataState } from '@/hooks/search_result/DataState'
import { displayMixUniversities } from '@/hooks/search_result/displayMixUniversities'
import { selectDepartmentSystem } from '@/hooks/search_result/selectDepartmentSystem'
import { selectDivision } from '@/hooks/search_result/selectDivision'
import { selectExamSubject } from '@/hooks/search_result/selectExamSubject'
import { selectFirstExamSubjects } from '@/hooks/search_result/selectFirstExamSubjects'
import { selectSecondExamSubjects } from '@/hooks/search_result/selectSecondExamSubjects'

import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { University } from '@/types/SearchResult'

const SearchResult: NextPage = () => {
  useRequireSignedIn()
  const {
    checkedItems,
    deviationValuesArr,
    jsonUniversity,
    universities,
    selectableUniversities,
    firstTrueOrFalse,
    secondTrueOrFalse,
  } = DataState()

  if (!checkedItems || !deviationValuesArr || !jsonUniversity) {
    return <LoadingScreen />
  }

  let checkedItemsArr: string[] = []
  if (checkedItems !== undefined) {
    checkedItemsArr = checkedItems
      .replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
      .split(',')
  }

  let deviationValuesList: string[] = []
  if (deviationValuesArr !== null) {
    deviationValuesList = deviationValuesArr
      .replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
      .split(',')
  }

  // universitiesが無い場合はエラー画面を表示
  if (!universities) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center ">
        <div className="text-center text-red-500">
          <h1 className="text-xl">大学情報が取得できませんでした</h1>
          <div className="mt-4 flex items-center justify-center">
            <Link
              href="/current/desired_schools/search/option"
              className="rounded bg-sky-500 px-6 py-2 text-base text-white sm:text-lg"
            >
              各種検索へ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const altArr: University[] = []
  const semiFinalUniversitis: University[] = []
  const finalCommonSelectedUniversities: University[] = []
  const finalSecondSelectedUniversities: University[] = []
  const returnUniversities: University[] = []
  const afterDevisionUniversity: University[] = []

  selectDivision({ jsonUniversity, checkedItemsArr, afterDevisionUniversity })

  selectDepartmentSystem({
    afterDevisionUniversity,
    checkedItemsArr,
    semiFinalUniversitis,
    altArr,
  })

  selectExamSubject({
    checkedItemsArr,
    firstTrueOrFalse,
    secondTrueOrFalse,
    selectFirstExamSubjects,
    selectSecondExamSubjects,
    finalCommonSelectedUniversities,
    finalSecondSelectedUniversities,
    altArr,
    selectableUniversities,
    returnUniversities,
    semiFinalUniversitis,
  })

  const toDisplayMixArr: University[] = []
  displayMixUniversities({
    toDisplayMixArr,
    firstTrueOrFalse,
    secondTrueOrFalse,
    finalCommonSelectedUniversities,
    finalSecondSelectedUniversities,
  })

  console.log(toDisplayMixArr)

  const displayUniversities: University[] = [...new Set(toDisplayMixArr)]
  console.log('displayUniversities', displayUniversities)

  if (displayUniversities.length === 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="text-center text-red-500">
          <h1 className="text-xl">該当する大学が見つかりませんでした</h1>
          <div className="mt-4 flex items-center justify-center">
            <Link
              href="/current/desired_schools/search/option"
              className="rounded bg-sky-500 px-6 py-2 text-base text-white sm:text-lg"
            >
              再試行する
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mt-10 flex items-center justify-center">
        <table className="w-full items-center justify-center border border-gray-500 sm:w-1/2">
          <Head />
          <DepartmentSearchResultData
            displayUniversities={displayUniversities}
            deviationValuesList={deviationValuesList}
          />
        </table>
      </div>
      <div className="mt-4 flex w-full items-center justify-end sm:w-2/3">
        <div className="flex w-full items-center justify-end sm:w-1/2">
          <div className="flex items-center justify-center">
            <LinkButton
              href={'desired_schools/search/option'}
              text={'各種検索に戻る'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResult
