import { useState } from 'react'
import { useFetch } from './handleUseFetch'

export const DataState = () => {
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
