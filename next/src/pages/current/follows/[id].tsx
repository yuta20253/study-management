import { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import LinkButton from '@/components/page/Common/LinkButton'
import { FollowsUserInfo } from '@/components/page/follows/TableRow/FollowsInfoTr'
import { DataState } from '@/hooks/follows/Show/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const FollowsUserDetail: NextPage = () => {
  useRequireSignedIn()
  const { showUser, error } = DataState()
  if (!showUser) {
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

  const birth = new Date(showUser.birthday)
  const year = birth.getFullYear()
  const month = birth.getMonth() + 1
  const day = birth.getDate()

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="flex min-h-screen items-center justify-center">
        <div className="top-5 h-3/4 w-full rounded-lg bg-white p-6 shadow-lg sm:w-4/5 md:w-3/5 lg:w-1/2">
          <div className="mb-4 flex items-center justify-center">
            <table className="w-full border-collapse border border-slate-500">
              <tbody>
                <tr>
                  <th className="h-12 border border-slate-600 bg-sky-700">
                    <span className="flex h-10 items-center justify-center text-center text-2xl text-white">
                      個人情報
                    </span>
                  </th>
                </tr>
                <FollowsUserInfo
                  first={showUser.family_name_kana}
                  second={showUser.given_name_kana}
                />
                <FollowsUserInfo
                  first={showUser.family_name}
                  second={showUser.given_name}
                />
                <FollowsUserInfo
                  first={year}
                  second="年"
                  third={month}
                  four="月"
                  five={day}
                  six="日"
                />
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <LinkButton
              href={'/current/user/relationships'}
              text={'フォロー関係一覧へ'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowsUserDetail
