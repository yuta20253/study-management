import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { FollowingUser } from '@/types/User'

export const useFetch = () => {
  const [user] = useUserState()
  const [users, setUsers] = useState<FollowingUser[]>([])
  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user/followings'

      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => setUsers(res.data))
        .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
    }
  }, [user.isSignedIn])

  return {
    users,
  }
}
