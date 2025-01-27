import { ChangeEvent, createContext, Dispatch, SetStateAction } from 'react'

export const CheckBoxContext = createContext(
  {} as {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    setCheckedItems: Dispatch<SetStateAction<string[]>>
    checkedItems: string[]
    handleClearCommonEntranceExaminationSunjects: () => void
    handleClearSecondEntranceExaminationSunjects: () => void
  },
)

export const SliderContext = createContext(
  {} as {
    deviationValues: number[] | undefined
    setDeviationValues: Dispatch<SetStateAction<number[]>>
  },
)
