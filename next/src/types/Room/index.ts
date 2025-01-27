export type RoomProps = {
  id: number
  chat_room: {
    id: number
  }
  other_user: {
    family_name: string
    given_name: string
    id: number
  }
}

export type UsersProps = {
  id: number
  family_name: string
  given_name: string
}

export type UserListProps = {
  usersToDisplay: UsersProps[]
  handleRegister: (
    user_id: number,
    firstName: string,
    secondName: string,
  ) => void
}

export type RoomListProps = {
  rooms: RoomProps[]
}

export type NoUserDisplayProps = {
  users: UsersProps[]
  user: UsersProps
  handleRegister: (
    user_id: number,
    firstName: string,
    secondName: string,
  ) => void
}
