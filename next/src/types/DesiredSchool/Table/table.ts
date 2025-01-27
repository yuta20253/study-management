import { ChangeEvent } from 'react'

export type NewRegistrationDesiredSchoolTableProps = {
  input: string
  handleChangeInputValue: (event: ChangeEvent<HTMLInputElement>) => void
}

export type DesiredSchoolProps = {
  id: number
  university: string
  faculty: string
  department: string
  code: number
  faculty_of_code: number
}

export type DesiredSchools = {
  universities: DesiredSchoolProps[] | undefined
}
