import Link from 'next/link'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()
  const fullName = user.family_name + user.given_name

  return (
    <header className="sticky top-0 h-14 w-full bg-sky-600">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="rounded bg-sky-700 px-2 py-1">
          <h1>
            <Link href={user.isSignedIn ? `/current/home` : `/sign_in`}>
              <p className="text-xl text-white">タイトル</p>
            </Link>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {user.isFetched && (
            <div>
              {!user.isSignedIn ? (
                <ul className="flex gap-4 md:gap-8">
                  <li className="rounded bg-sky-700 px-4 py-2">
                    <Link href="/sign_in">
                      <p className="text-lg sm:text-xl text-white">Sign in</p>
                    </Link>
                  </li>
                  <li className="rounded bg-sky-700 px-4 py-2">
                    <Link href="/sign_up">
                      <p className="text-lg sm:text-xl text-white">Sign up</p>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="flex gap-4 md:gap-8">
                  <li className="rounded bg-sky-700 px-4 py-2">
                    <p className="text-lg sm:text-xl text-white">{fullName}</p>
                  </li>
                  <li className="rounded bg-sky-700 px-4 py-2">
                    <Link href="/sign_out">
                      <p className="text-lg sm:text-xl text-white">Sign out</p>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
