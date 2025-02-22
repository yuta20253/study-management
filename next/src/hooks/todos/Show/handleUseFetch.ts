import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { TodoProps } from '@/types/Todo'

export const useFetch = () => {
  const [user] = useUserState()
  const [todo, setTodo] = useState<TodoProps>()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (user.isSignedIn) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/todos/' + id
      const header = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: header })
        .then((res: AxiosResponse) => {
          setTodo(res.data)
          setError(null)
        })
        .catch((e: AxiosError<{ e: string }>) => {
          if (e.response?.status === 404) {
            setError('Todoが見つかりません')
          } else {
            setError('データ取得に失敗しました')
          }
        })
    }
  }, [user.isSignedIn, id])

  return {
    user,
    todo,
    router,
    id,
    error,
  }
}
