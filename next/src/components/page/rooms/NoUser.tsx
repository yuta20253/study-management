import { NoUserDisplayProps } from '@/types/Room'

export const NoUserDisplay = ({
  users,
  user,
  handleRegister,
}: NoUserDisplayProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
    <div className="text-center text-xl text-gray-700 sm:text-2xl md:text-3xl">
      チャットルームが存在しません
    </div>
    <div className="w-full max-w-7xl space-y-4">
      {/* 親要素に 'flex' と 'justify-center' を追加して中央に配置 */}
      <ul className="flex flex-col items-center justify-center gap-4">
        {users
          .filter((usr) => usr.id !== user.id)
          .map((u) => (
            <li
              key={u.id}
              className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <span className="text-lg font-semibold text-gray-800">
                {u.family_name} {u.given_name}
              </span>
              <button
                className="rounded bg-sky-500 px-4 py-2 text-white transition duration-200 hover:bg-sky-600"
                onClick={() =>
                  handleRegister(u.id, u.family_name, u.given_name)
                }
              >
                登録
              </button>
            </li>
          ))}
      </ul>
    </div>
  </div>
)
