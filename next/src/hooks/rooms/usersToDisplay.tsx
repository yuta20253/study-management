import { LoadingScreen } from '@/components/Loading'
import { RoomProps, UsersProps } from '@/types/Room'

export const usersToDisplayHandler = (
  users: UsersProps[],
  rooms: RoomProps[],
  user: UsersProps,
) => {
  const usersToDisplay = users.filter((usr) => {
    if (rooms.length === 0) {
      return <LoadingScreen />
    }
    return (
      usr.id !== user.id &&
      !rooms.some((room) => {
        if (!room || !room.other_user) {
          return false
        }
        return (
          room.other_user.family_name + room.other_user.given_name ===
          `${usr.family_name}${usr.given_name}`
        )
      })
    )
  })

  return {
    usersToDisplay,
  }
}
