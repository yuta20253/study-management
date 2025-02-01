import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { FollowsUser } from '@/types/User'

export const useFetch = () => {
  const [user] = useUserState()
  const [showUser, setShowUser] = useState<FollowsUser>()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/follows/' + id
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          console.log(res.data)
          setShowUser(res.data.user)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setError(e.response?.data.error || '予期しないエラーが発生しました')
        })
    }
  }, [id, user.isSignedIn])
  return {
    showUser,
    error,
  }
}
