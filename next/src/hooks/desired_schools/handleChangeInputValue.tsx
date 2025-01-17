import { ChangeEvent, useState } from "react"

export const useInputDesiredSchoolName = () => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const japaneseRegex = /^[ぁ-んァ-ン一-龥]+$/
  const isValidJapanese = (text: string): boolean => {
    return japaneseRegex.test(text)
  }
  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValid(isValidJapanese(event.target.value))
  }    
  return {
    isValid,
    setIsValid,
    isValidJapanese,
    handleChangeInputValue,
  }
}