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
        // Make sure room and room.other_user are defined
        if (!room || !room.other_user) {
          return false // Avoid further processing if the room or other_user is undefined
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
