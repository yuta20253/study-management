type UsersProps = {
  id: number
  family_name: string
  given_name: string
}

type UserListProps = {
  usersToDisplay: UsersProps[]
  handleRegister: (
    user_id: number,
    firstName: string,
    secondName: string,
  ) => void
}

export const UserList = ({ usersToDisplay, handleRegister }: UserListProps) => (
  <div className="mt-4 w-full max-w-7xl space-y-4">
    {/* 縦並びに変更するため、flex-colを使用し、縦のスペースを調整 */}
    <ul className="flex flex-col items-center space-y-4">
      {usersToDisplay.map((u) => (
        <li
          key={u.id}
          className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md transition duration-200 hover:shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4" // 各スクリーンサイズに合わせて横幅を調整
        >
          <span className="text-lg font-semibold text-gray-800">
            {u.family_name} {u.given_name}
          </span>
          <button
            className="rounded bg-sky-500 px-4 py-2 text-white transition duration-200 hover:bg-sky-600"
            onClick={() => {
              handleRegister(u.id, u.family_name, u.given_name)
            }}
          >
            登録
          </button>
        </li>
      ))}
    </ul>
  </div>
)
