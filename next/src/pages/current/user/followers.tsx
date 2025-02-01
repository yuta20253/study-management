import Person from '@mui/icons-material/Person'
import { NextPage } from 'next'
import Link from 'next/link'
import { LoadingScreen } from '@/components/Loading'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import LinkButton from '@/components/page/user/Button/LinkButton'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { DataState } from '@/hooks/user/Followers/DataState'

const Followers: NextPage = () => {
  useRequireSignedIn()
  const { users, error } = DataState()
  if (!users) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <ErrorTemplate
        error={error}
        href={'/current/user/relationships'}
        text={'フォロー関係へ'}
      />
    )
  }

  return (
    <div className="w-full px-4">
      {/* フォローしていない場合のメッセージ */}
      {users.length == 0 ? (
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
          <div className="items-center border p-4 text-center">
            誰もフォローしていません
          </div>
          {/* フォロー関係へボタン */}
          <div className="mt-6 flex w-full justify-end sm:w-auto">
            <LinkButton
              href={'/current/user/relationships'}
              text={'フォロー関係へ'}
            />
          </div>
        </div>
      ) : (
        <div className="mt-10">
          {/* ユーザーリスト */}
          <div className="mx-auto flex max-w-4xl flex-col space-y-4">
            {users.map((user, i: number) => (
              <div
                key={i}
                className="flex items-center rounded-lg border border-slate-100 p-4"
              >
                <Person className="text-gray-600" />
                <Link
                  href={`/current/follows/${user.id}`}
                  className="ml-4 text-sky-500 hover:underline"
                >
                  <span>
                    {user.family_name} {user.given_name}
                  </span>
                </Link>
              </div>
            ))}
            {/* フォロー関係へボタン (PC版では右端に表示) */}
            <div className="mt-6 flex justify-end">
              <LinkButton
                href={'/current/user/relationships'}
                text={'フォロー関係へ'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Followers
