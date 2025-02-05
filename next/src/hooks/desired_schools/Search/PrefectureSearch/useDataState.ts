import { useState } from 'react'
import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { user, universities, setUniversities } = useFetch()
  const [checkedItems, setCheckedItems] = useState<string>('')

  return {
    user,
    checkedItems,
    setCheckedItems,
    universities,
    setUniversities,
  }
}
