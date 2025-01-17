import { useContext } from 'react'
import { TodoDetailProps } from '@/types/Todo'
import { TodoDetailContext } from '@/types/Todo/Context/todo'

export const UseHandleClickTodo = ({ todo }: TodoDetailProps) => {
  const { setTodoDetail } = useContext(TodoDetailContext)

  return <button onClick={() => setTodoDetail(todo)}>{todo.title}</button>
}
