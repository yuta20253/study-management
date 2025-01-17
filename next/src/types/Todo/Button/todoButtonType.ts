import { Dispatch, SetStateAction } from 'react'

export type DeleteTodoProps = {
  id: number
  isDelete: boolean
  setIsDelete: Dispatch<SetStateAction<boolean>>
}
