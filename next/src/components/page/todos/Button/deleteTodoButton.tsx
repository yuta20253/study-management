import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DeleteTodoProps } from '@/types/Todo/Button/button'
import { TodoDeleteContext } from '@/types/Todo/Context/todo_context'
export const UseDeleteTodoButton = ({
  id,
  isDelete,
  setIsDelete,
}: DeleteTodoProps) => {
  const router = useRouter()
  const { todos, setTodos } = useContext(TodoDeleteContext)
  //console.log(`id:::::::::::::::::::::${id}`)

  const handleClick = () => {
    console.log('削除しようとしています')
    console.log(`削除するid:::::::::::::${id}`)
    setIsDelete(!isDelete)
    if (isDelete) {
      setTodos((prevTodos) => {
        return prevTodos?.filter((todo) => {
          return todo.id !== id
        })
      })

      //todos?.map((todo) => console.log(todo))
    }
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/current/todos/${id}`
    const header = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    axios({ method: 'DELETE', url: url, headers: header, data: todos })
      .then(() => {
        console.log('削除しました')
        setIsDelete(!isDelete)
        router.reload()
      })
      .catch((e: AxiosError<{ error: string }>) =>
        console.log(`削除に失敗しました`, e.message),
      )
  }
  return (
    <button
      onClick={handleClick}
      className="rounded bg-sky-500 px-3 py-1 text-white"
    >
      削除
    </button>
  )
}
