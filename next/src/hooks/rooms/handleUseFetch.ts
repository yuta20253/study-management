import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '../useGlobalState'
import { RoomProps, UsersProps } from '@/types/Room'

export const useFetch = () => {
  const [user] = useUserState()
  const [rooms, setRooms] = useState<RoomProps[]>([])
  const [users, setUsers] = useState<UsersProps[]>([])
  const [error, setError] = useState<string | null>(null)
  // ユーザー情報とルーム情報を取得
  useEffect(() => {
    if (user.isSignedIn) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/rooms'
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          setRooms(res.data.rooms)
          setUsers(res.data.users)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          setError(e.response?.data.error || '予期しないエラーが発生しました')
        })
    }
  }, [user.isSignedIn])

  return {
    user,
    rooms,
    setRooms,
    users,
    error,
  }
}
