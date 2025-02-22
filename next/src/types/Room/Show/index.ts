export type RoomProps = {
  id: number
  name: string
}

export type MessageProps = {
  content: string
  user_id: number
}

export type ChatHeaderProps = {
  roomName: string | undefined
}
