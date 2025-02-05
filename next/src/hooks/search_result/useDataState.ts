import { useState, useRef } from 'react'
import { useFetch } from './handleUseFetch'
import { University } from '@/types/SearchResult'

export const useDataState = () => {
  const [checkedItems] = useState(localStorage.getItem('checkedItems'))
  const [deviationValuesArr] = useState(
    localStorage.getItem('deviationValuesArr'),
  )
  const [universities] = useState<University[] | undefined>([])
  const selectableUniversities: string[] = []
  const firstTrueOrFalse = useRef<number | undefined>(null!)
  const secondTrueOrFalse = useRef<number | undefined>(null!)

  const { jsonUniversity } = useFetch()

  return {
    checkedItems,
    deviationValuesArr,
    jsonUniversity,
    universities,
    selectableUniversities,
    firstTrueOrFalse,
    secondTrueOrFalse,
  }
}
