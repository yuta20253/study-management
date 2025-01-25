export type MessageProps = {
  content: string
  user_id: number
}

export type UsersProps = {
  id: number
  family_name: string
  given_name: string
}

export type MessagesListProps = {
  messages: MessageProps[]
  user: UsersProps
}
