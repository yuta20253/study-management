import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCreateRoom } from './handleCreateRoom'
import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { user, rooms, setRooms, users, error } = useFetch()
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const { createRoom } = useCreateRoom(
    user,
    setMessage,
    setRooms,
    router,
    message,
  )
  return {
    user,
    rooms,
    users,
    error,
    createRoom,
    message,
  }
}
