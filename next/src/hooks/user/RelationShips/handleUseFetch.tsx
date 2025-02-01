import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { RelationShipUser } from '@/types/User'

export const useFetch = () => {
  const [user] = useUserState()
  const [users, setUsers] = useState<RelationShipUser[]>([])
  const [followedIdsArr, setFollowedIdsArr] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user/relationships'
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }

      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          console.log(res.data.users)
          setUsers(res.data.users)
          const aaa: number[] = []
          user.followers.map((f) => aaa.push(f.followed_id))

          setFollowedIdsArr([...aaa])
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setError(e.response?.data.error || '予期しないエラーが発生しました')
        })
    }
  }, [user.followers, user.isSignedIn])

  return {
    user,
    users,
    followedIdsArr,
    error,
  }
}
