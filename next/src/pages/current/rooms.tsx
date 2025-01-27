import { NextPage } from 'next'
import { DataState } from '../../hooks/rooms/DataState'
import { LoadingScreen } from '@/components/Loading'
import { RoomList } from '@/components/page/rooms/List/RoomList'
import { UserList } from '@/components/page/rooms/List/UserList'
import { NoUserDisplay } from '@/components/page/rooms/NoUser'
import { useHandleRegister } from '@/hooks/rooms/useHandleRegister'
import { usersToDisplayHandler } from '@/hooks/rooms/usersToDisplay'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const Rooms: NextPage = () => {
  useRequireSignedIn()
  const { user, rooms, users, createRoom, message } = DataState()
  const { handleRegister } = useHandleRegister(createRoom)

  if (!rooms || rooms === undefined) {
    return <LoadingScreen />
  }
  // 既にルームに登録されているユーザーを除外する
  const { usersToDisplay } = usersToDisplayHandler(users, rooms, user)

  return (
    <>
      <div>
        {message && (
          <div className="mb-4 rounded bg-green-100 p-4 text-green-700">
            {message}
          </div>
        )}
        {/* Rest of the JSX */}
      </div>
      <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        {rooms.length === 0 ? (
          <NoUserDisplay
            users={users}
            user={user}
            handleRegister={handleRegister}
          />
        ) : (
          <>
            <h1 className="mb-6 text-center text-3xl font-semibold text-gray-900">
              チャットルーム
            </h1>
            <RoomList rooms={rooms} />
            <UserList
              usersToDisplay={usersToDisplay}
              handleRegister={handleRegister}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Rooms
