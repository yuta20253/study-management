import { useRouter } from 'next/router'
import { useState } from 'react'
import { universityLength } from '../../utils/DesiredSchool/universityLength'
import { useInputDesiredSchoolName } from './handleChangeInputValue'
import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { jsonUniversity, universities, setUniversities, error, setError } =
    useFetch()
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const router = useRouter()
  const count = 0

  universityLength(count, jsonUniversity)
  const { isValid, setIsValid, isValidJapanese, handleChangeInputValue } =
    useInputDesiredSchoolName()

  return {
    jsonUniversity,
    universities,
    setUniversities,
    deleteId,
    setDeleteId,
    isDelete,
    setIsDelete,
    router,
    count,
    isValid,
    setIsValid,
    isValidJapanese,
    handleChangeInputValue,
    error,
    setError,
  }
}
