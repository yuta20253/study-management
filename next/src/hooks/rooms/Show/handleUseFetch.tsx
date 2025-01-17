import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

type RoomProps = {
  id: number
  name: string
}

type MessageProps = {
  content: string
  user_id: number
}

export const useFetch = () => {
  const [user] = useUserState()
  const [room, setRoom] = useState<RoomProps | undefined>(undefined)
  const [messages, setMessages] = useState<MessageProps[] | undefined>(
    undefined,
  )
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (user.isSignedIn && id) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/rooms/' + id
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          setRoom(res.data.room)
          setMessages(res.data.messages)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
        })
    }
  }, [id, user.isSignedIn])

  return {
    user,
    room,
    messages,
    setMessages,
  }
}
