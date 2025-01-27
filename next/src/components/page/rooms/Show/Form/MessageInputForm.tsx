import React from 'react'
import { MessageInputProps } from '@/types/Room/Show/Form/form'

export const MessageInputForm: React.FC<MessageInputProps> = ({
  messageContent,
  setMessageContent,
  sendMessage,
}: MessageInputProps) => (
  <form onSubmit={sendMessage}>
    {/* フォーム送信でメッセージを送信 */}
    <input
      type="text"
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)} // メッセージ内容を更新
      placeholder="メッセージを入力..."
      className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
    />
    {/* Send button */}
    <button
      type="submit" // 送信ボタンをフォームに関連付け
      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none sm:w-auto"
    >
      送信
    </button>
  </form>
)
