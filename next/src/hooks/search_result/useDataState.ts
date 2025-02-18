import { useState, useRef, useEffect } from 'react'
import { useFetch } from './handleUseFetch'
import { University } from '@/types/SearchResult'

export const useDataState = () => {
  const [checkedItems, setCheckedItems] = useState<string | null>(null)
  const [deviationValuesArr, setDeviationValuesArr] = useState<string | null>(
    null,
  )
  const [universities] = useState<University[] | undefined>([])
  const selectableUniversities: string[] = []
  const firstTrueOrFalse = useRef<number | undefined>(null!)
  const secondTrueOrFalse = useRef<number | undefined>(null!)

  const { jsonUniversity } = useFetch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // クライアントサイドでのみ localStorage にアクセス
      setCheckedItems(localStorage.getItem('checkedItems'))
      setDeviationValuesArr(localStorage.getItem('deviationValuesArr'))
    }
  }, [])

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
