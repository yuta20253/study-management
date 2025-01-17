import Link from 'next/link'

type RoomProps = {
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

type RoomListProps = {
  rooms: RoomProps[]
}

export const RoomList = ({ rooms }: RoomListProps) => (
  <ul className="space-y-4">
    {rooms.map((room) => (
      <li key={room.id} className="rounded-lg bg-white p-4 shadow-md">
        <Link
          href={`/current/rooms/${room.chat_room.id}`}
          className="text-lg font-semibold text-gray-800 hover:text-sky-500"
        >
          {room.other_user.family_name} {room.other_user.given_name}
        </Link>
      </li>
    ))}
  </ul>
)
