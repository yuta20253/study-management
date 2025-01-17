import { ChangeEvent, createContext, Dispatch, SetStateAction } from 'react'

export const CheckBoxContext = createContext(
  {} as {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    //register: UseFormRegister<CheckBoxName>
  },
)

export const SliderContext = createContext(
  {} as {
    deviationValues: number[] | undefined
    setDeviationValues: Dispatch<SetStateAction<number[]>>
  },
)
