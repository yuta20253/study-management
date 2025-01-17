import { useState } from 'react'
import { useCreateRoom } from './handleCreateRoom'
import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, rooms, setRooms, users, error } = useFetch()
  const [message, setMessage] = useState<string | null>(null)

  const { createRoom } = useCreateRoom(user, setMessage, setRooms)
  return {
    user,
    rooms,
    users,
    error,
    createRoom, // チャットルーム作成関数を返す
    message,
  }
}
