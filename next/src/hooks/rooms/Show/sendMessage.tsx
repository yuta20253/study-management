import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { MessageProps } from '@/types/Room/Show'

export const useSendMessage = (
  messageContent: string,
  setMessageContent: Dispatch<SetStateAction<string>>,
  setMessages: Dispatch<SetStateAction<MessageProps[] | undefined>>,
  safeMessages: MessageProps[],
  id: string | string[] | undefined,
) => {
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault() // フォーム送信をキャンセル

    if (!messageContent.trim()) {
      return // 空メッセージは送信しない
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/rooms/${id}/messages`
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    try {
      // メッセージをサーバーに送信
      const response = await axios.post(
        url,
        { content: messageContent },
        { headers },
      )

      // サーバーからのレスポンスをメッセージリストに追加
      setMessages([...safeMessages, response.data])

      // メッセージ入力欄を空にする
      setMessageContent('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return {
    sendMessage,
  }
}
