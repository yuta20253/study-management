import { useState } from 'react'
import { useModal } from '../../todos/Modal/useModal'
import { useFetch } from './handleUseFetch'
import { useChangeInputValueHandler } from './useChangeInputValueHandler'

export const useDataState = () => {
  const { user, jsonUniversity, setJsonUniversity, router } = useFetch()
  const [input, setInput] = useState<string>('')
  const { isOpen, onOpen, onClose } = useModal()
  const [isValid, setIsValid] = useState<boolean>(true)
  const japaneseRegex = /^[ぁ-んァ-ン一-龥]+$/
  const isValidJapanese = (text: string): boolean => {
    return japaneseRegex.test(text)
  }

  const { handleChangeInputValue } = useChangeInputValueHandler(
    setInput,
    setIsValid,
    isValidJapanese,
  )

  return {
    user,
    jsonUniversity,
    setJsonUniversity,
    input,
    isOpen,
    onOpen,
    onClose,
    router,
    isValid,
    handleChangeInputValue,
  }
}
