import { useFetch } from './handleUseFetch'

export const DataState = () => {
  const { user, messages, setMessages } = useFetch()
  console.log('messages', messages)

  return {
    //otherUser,
    user,
    messages,
    setMessages,
  }
}
