import { useState } from 'react'
import { useModal } from '../../todos/Modal/useModal'
import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, jsonUniversity, setJsonUniversity, router } = useFetch()
  const [input, setInput] = useState<string>('')
  const { isOpen, onOpen, onClose } = useModal()
  const [isValid, setIsValid] = useState<boolean>(true)
  const japaneseRegex = /^[ぁ-んァ-ン一-龥]+$/
  const isValidJapanese = (text: string): boolean => {
    return japaneseRegex.test(text)
  }

  return {
    user,
    jsonUniversity,
    setJsonUniversity,
    input,
    setInput,
    isOpen,
    onOpen,
    onClose,
    router,
    isValid,
    setIsValid,
    isValidJapanese,
  }
}
