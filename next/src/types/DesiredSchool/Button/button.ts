import { Dispatch, SetStateAction } from 'react'

export type DeleteDesiredSchoolProps = {
  id: number
  isDelete: boolean
  setIsDelete: Dispatch<SetStateAction<boolean>>
}

export type LinkProps = {
  url: string
  title: string
}
