import { Dispatch, SetStateAction } from 'react'

export type DeleteTodoProps = {
  id: number
  isDelete: boolean
  setIsDelete: Dispatch<SetStateAction<boolean>>
}

export type ModalOpenButtonProps = {
  onOpen: () => void
  text: string
}

export type HandleProps = {
  handleChangeStatusAll: () => void
  handleChangeStatusIncomplete: () => void
  handleChangeStatusOnTheWay: () => void
  handleChangeStatusComplete: () => void
}
