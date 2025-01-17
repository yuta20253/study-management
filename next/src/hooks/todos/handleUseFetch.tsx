import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '../useGlobalState'
import { TodoProps, Meta } from '@/types/Todo'

export const useFetch = () => {
  const [user] = useUserState()
  const [todos, setTodos] = useState<TodoProps[] | undefined>([])
  const [meta, setMeta] = useState<Meta>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  useEffect(() => {
    if (user && user.isSignedIn) {
      console.log('サインインしています')
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/todos/?page=' + page
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          setTodos(res.data.todos)
          setMeta(res.data.meta)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          if (e.response?.data.error) {
            setErrorMessage(e.response.data.error)
          } else {
            setErrorMessage('予期せぬエラーが発生しました')
          }
        })
    }
  }, [user, setTodos, page])

  return {
    todos,
    setTodos,
    meta,
    setMeta,
    errorMessage,
  }
}
