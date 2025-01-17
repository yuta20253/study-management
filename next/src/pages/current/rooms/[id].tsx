import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ChatFooter } from '@/components/page/rooms/Show/ChatFooter'
import { ChatHeader } from '@/components/page/rooms/Show/ChatHeader'
import { MessageInputForm } from '@/components/page/rooms/Show/Form/MessageInputForm'
import { MessagesList } from '@/components/page/rooms/Show/List/MessagesList'
import { DataState } from '@/hooks/rooms/Show/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const RoomDetail: NextPage = () => {
  useRequireSignedIn()
  const { user, room, messages, setMessages } = DataState()
  const [messageContent, setMessageContent] = useState<string>('')

  // messages が undefined の場合は空の配列に初期化
  const safeMessages = messages || []

  const router = useRouter()
  const { id } = router.query

  // メッセージ送信関数
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

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <ChatHeader roomName={room?.name} />
      <MessagesList messages={safeMessages} user={user} />
      <div className="flex items-center justify-center border-t border-gray-200 bg-white p-4">
        <div className="flex flex-col items-center space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <MessageInputForm
            messageContent={messageContent}
            setMessageContent={setMessageContent}
            sendMessage={sendMessage}
          />
          <ChatFooter />
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
