import React from 'react'
import { MessageInputProps } from '@/types/Room/Show/Form/form'

export const MessageInputForm: React.FC<MessageInputProps> = ({
  messageContent,
  setMessageContent,
  sendMessage,
}: MessageInputProps) => (
  <form onSubmit={sendMessage}>
    <input
      type="text"
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
      placeholder="メッセージを入力..."
      className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
    />
    <button
      type="submit"
      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none sm:w-auto"
    >
      送信
    </button>
  </form>
)
