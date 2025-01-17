import { useState } from 'react'
import { usePaginationHandler } from './handleChangePagination'
import { useStatusHandlers } from './handleChangeStatus'
import { useFetch } from './handleUseFetch'
import { useModal } from '@/hooks/todos/Modal/useModal'
import { TodoProps } from '@/types/Todo'
export const DataState = () => {
  const [todoDetail, setTodoDetail] = useState<TodoProps | undefined>(undefined)
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useModal()
  const [status, setStatus] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const { todos, setTodos, meta, setMeta, errorMessage } = useFetch()

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
