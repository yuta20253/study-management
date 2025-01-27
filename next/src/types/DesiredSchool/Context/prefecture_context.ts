import { ChangeEvent, createContext } from 'react'

export const CheckBoxContext = createContext(
  {} as {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    //register: UseFormRegister<CheckBoxName>
  },
)
