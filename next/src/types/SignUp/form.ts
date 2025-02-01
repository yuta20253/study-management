import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export type NameProps = {
  theme: string
  placeholderFirst: string
  placeholderSecond: string
  registerFirst: UseFormRegisterReturn
  registerSecond: UseFormRegisterReturn
  errorFirst?: FieldError | undefined
  errorSecond?: FieldError | undefined
}

export type birthdayProps = {
  theme: string
  register: UseFormRegisterReturn
  error?: FieldError | undefined
  setDate: Dispatch<SetStateAction<string>>
}

export type GenderProps = {
  theme: string
  valueFirst: string
  registerFirst: UseFormRegisterReturn
  labelFirst: string
  valueSecond: string
  registerSecond: UseFormRegisterReturn
  labelSecond: string
  changeGender: (event: ChangeEvent<HTMLInputElement>) => void
}

export type InputProps = {
  theme: string
  type: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: FieldError | undefined
}
