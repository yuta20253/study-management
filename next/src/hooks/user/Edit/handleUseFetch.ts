import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

export const useFetch = () => {
  const [user, setUser] = useUserState()
  const [selected, setSelected] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (user.isSignedIn) {
      console.log('サインインしています')
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user/edit'
      const header = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: header })
        .then((res: AxiosResponse) => {
          console.log('Userの情報を取得されました')
          console.log(res.data)
          //console.log(res.data)
          setSelected(res.data.gender)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setError(e.response?.data.error || '予期しないエラーが発生しました')
        })
    }
  }, [user.isSignedIn])
  return {
    user,
    setUser,
    selected,
    setSelected,
    error,
  }
}
