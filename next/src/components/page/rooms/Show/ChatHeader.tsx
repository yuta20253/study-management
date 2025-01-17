import React from 'react'

type ChatHeaderProps = {
  roomName: string | undefined
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ roomName }) => (
  <div className="flex-none bg-blue-500 p-4 text-white">
    <h1 className="text-2xl font-bold">{roomName}</h1>
    <p>ここにチャットメッセージが表示されます。</p>
  </div>
)
