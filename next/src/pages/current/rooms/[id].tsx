import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ChatFooter } from '@/components/page/rooms/Show/ChatFooter'
import { ChatHeader } from '@/components/page/rooms/Show/ChatHeader'
import { MessageInputForm } from '@/components/page/rooms/Show/Form/MessageInputForm'
import { MessagesList } from '@/components/page/rooms/Show/List/MessagesList'
import { DataState } from '@/hooks/rooms/Show/DataState'
import { useSendMessage } from '@/hooks/rooms/Show/sendMessage'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const RoomDetail: NextPage = () => {
  useRequireSignedIn()
  const { user, room, messages, setMessages } = DataState()
  const [messageContent, setMessageContent] = useState<string>('')

  // messages が undefined の場合は空の配列に初期化
  const safeMessages = messages || []

  const router = useRouter()
  const { id } = router.query
  const { sendMessage } = useSendMessage(
    messageContent,
    setMessageContent,
    setMessages,
    safeMessages,
    id,
  )

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
