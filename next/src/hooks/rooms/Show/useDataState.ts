import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const { user, room, messages, setMessages, error } = useFetch()
  console.log('messages', messages)

  return {
    user,
    room,
    messages,
    setMessages,
    error,
  }
}
