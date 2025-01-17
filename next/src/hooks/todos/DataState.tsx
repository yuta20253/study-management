import {  useState } from 'react'
import { useModal } from '@/hooks/todos/Modal/useModal'
import { TodoProps } from '@/types/Todo'
import { useStatusHandlers } from './handleChangeStatus'
import { usePaginationHandler } from './handleChangePagination'
import { useFetch } from './handleUseFetch'
export const DataState = () => {
  const [todoDetail, setTodoDetail] = useState<TodoProps | undefined>(undefined)
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useModal()
  const [status, setStatus] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const { todos, setTodos, meta, setMeta, errorMessage} = useFetch()

  const { handleChangePage } = usePaginationHandler()

  const {
    handleChangeStatusAll,
    handleChangeStatusIncomplete,
    handleChangeStatusComplete,
    handleChangeStatusOnTheWay,
  } = useStatusHandlers(setStatus)


  return {
    todos,
    setTodos,
    todoDetail,
    setTodoDetail,
    deleteId,
    setDeleteId,
    isOpen,
    onOpen,
    onClose,
    status,
    setStatus,
    isDelete,
    setIsDelete,
    meta,
    setMeta,
    handleChangePage,
    handleChangeStatusAll,
    handleChangeStatusIncomplete,
    handleChangeStatusComplete,
    handleChangeStatusOnTheWay,
    errorMessage,
  }
}
