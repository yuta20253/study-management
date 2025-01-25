import Link from 'next/link'
import { RoomListProps } from '@/types/Room'

export const RoomList = ({ rooms }: RoomListProps) => {
  return (
    <ul className="space-y-4">
      {rooms.map((room, i: number) => (
        <li key={i} className="rounded-lg bg-white p-4 shadow-md">
          {room && room.chat_room ? (
            <Link
              href={`/current/rooms/${room.chat_room.id}`}
              className="text-lg font-semibold text-gray-800 hover:text-sky-500"
            >
              {room.other_user.family_name} {room.other_user.given_name}
            </Link>
          ) : (
            <span>Loading...</span>
          )}
        </li>
      ))}
    </ul>
  )
}
