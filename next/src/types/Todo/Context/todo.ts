import { createContext, Dispatch, SetStateAction } from 'react'
import { TodoProps } from '..'
export const TodoDetailContext = createContext(
  {} as {
    todoDetail: TodoProps | undefined
    setTodoDetail: Dispatch<SetStateAction<TodoProps | undefined>>
  },
)

export const TodoDeleteContext = createContext(
  {} as {
    todos: TodoProps[] | undefined
    setTodos: Dispatch<SetStateAction<TodoProps[] | undefined>>
    deleteId: number | undefined
    setDeleteId: Dispatch<SetStateAction<number | undefined>>
    isDelete: boolean
    setIsDelete: Dispatch<SetStateAction<boolean>>
  },
)
