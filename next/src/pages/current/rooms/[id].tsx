import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import { ReloadButton } from '@/components/page/rooms/Show/Button/ReloadButton'
import { ChatFooter } from '@/components/page/rooms/Show/ChatFooter'
import { MessageInputForm } from '@/components/page/rooms/Show/Form/MessageInputForm'
import { MessagesList } from '@/components/page/rooms/Show/List/MessagesList'
import { useSendMessage } from '@/hooks/rooms/Show/sendMessage'
import { useDataState } from '@/hooks/rooms/Show/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const RoomDetail: NextPage = () => {
  useRequireSignedIn()
  const { user, messages, setMessages, error } = useDataState()
  const [messageContent, setMessageContent] = useState<string>('')

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

  if (error) {
    return (
      <ErrorTemplate
        error={error}
        href={'/current/rooms'}
        text={'ルーム一覧へ'}
      />
    )
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <MessagesList messages={safeMessages} user={user} />
      <div className="flex items-center justify-center border-t border-gray-200 bg-white p-4">
        <div className="flex flex-col items-center space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <MessageInputForm
            messageContent={messageContent}
            setMessageContent={setMessageContent}
            sendMessage={sendMessage}
          />
          <ReloadButton />
          <ChatFooter />
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
