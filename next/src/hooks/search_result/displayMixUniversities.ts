import { MutableRefObject } from 'react'
import { University } from '@/types/SearchResult'

type DisplayMixUniversitiesProps = {
  toDisplayMixArr: University[]
  firstTrueOrFalse: MutableRefObject<number | undefined>
  secondTrueOrFalse: MutableRefObject<number | undefined>
  finalCommonSelectedUniversities: University[]
  finalSecondSelectedUniversities: University[]
}

export const displayMixUniversities = ({
  toDisplayMixArr,
  firstTrueOrFalse,
  secondTrueOrFalse,
  finalCommonSelectedUniversities,
  finalSecondSelectedUniversities,
}: DisplayMixUniversitiesProps) => {
  if (firstTrueOrFalse.current !== null && secondTrueOrFalse.current !== null) {
    console.log('1が選ばれました')
    finalCommonSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
    finalSecondSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  } else if (
    firstTrueOrFalse.current !== null &&
    secondTrueOrFalse.current === null
  ) {
    console.log('2が選ばれました')
    finalCommonSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  } else if (
    firstTrueOrFalse.current === null &&
    secondTrueOrFalse.current !== null
  ) {
    console.log('3が選ばれました')
    finalSecondSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  } else {
    console.log('4が選ばれました')
    finalCommonSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
    finalSecondSelectedUniversities.forEach((s) => toDisplayMixArr.push(s))
  }

  return toDisplayMixArr
}
