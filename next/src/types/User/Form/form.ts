import { Dispatch, SetStateAction } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import { EditUserProps } from '@/types/User'

export type AddressProps = {
  theme: string
  value: string
  registerProps: string
  error?: FieldError
}

export type BirthdayProps = {
  theme: string
  date: string
  registerProps: string
  error?: FieldError
}

export type BuildingProps = {
  theme: string
  props: string
  registerProps: string
  rules?: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
  }
  error?: FieldError
}

export type EmailProps = {
  theme: string
  email: string
  registerProps: string
}

export type GenderProps = {
  theme: string
  gender: string
  registerProps: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

export type UserInfo = {
  family_name_kana: string
  given_name_kana: string
  family_name: string
  given_name: string
  birthday: Date
  gender: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  postal_code: string
  prefecture: string
  city: string
  address1: string
  address2: string
  phone_number: string
  landline_phone_number: string
  errors: FieldErrors<EditUserProps>
}

export type NameProps = {
  theme: string
  first: string
  last: string
  label_first: string
  label_second: string
  registerFirstProps: string
  registerSecondProps: string
  rules?: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
  }
  errorFirst?: FieldError
  errorSecond?: FieldError
}

export type PhoneProps = {
  theme: string
  props: string
  registerProps: string
  rules?: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
  }
  error?: FieldError
}
