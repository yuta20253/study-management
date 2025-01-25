import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const useChangeInputValueHandler = (
  setInput: Dispatch<SetStateAction<string>>,
  setIsValid: Dispatch<SetStateAction<boolean>>,
  isValidJapanese: (text: string) => boolean,
) => {
  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    setIsValid(isValidJapanese(event.target.value))
  }

  return {
    handleChangeInputValue,
  }
}
