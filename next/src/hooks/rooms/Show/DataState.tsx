import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, room, messages, setMessages } = useFetch()
  console.log('messages', messages)

  return {
    //otherUser,
    user,
    room,
    messages,
    setMessages,
  }
}
