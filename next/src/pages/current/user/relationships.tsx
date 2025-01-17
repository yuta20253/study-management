import Person from '@mui/icons-material/Person'
import { NextPage } from 'next'
import Link from 'next/link'
import { LoadingScreen } from '@/components/Loading'
import LinkButton from '@/components/page/Common/LinkButton'
import OnClickFollowOrUnFollowButton from '@/components/page/user/Button/handleOnClickFollowOrUnFollowButton'
import RelationStatusLink from '@/components/page/user/Link/RelationStatusLink'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { DataState } from '@/hooks/user/RelationShips/DataState'

const Relationships: NextPage = () => {
  useRequireSignedIn()
  const {
    user,
    users,
    followedIdsArr,
    handleClickUnfollowUser,
    handleClickFollowUser,
  } = DataState()

  console.log(followedIdsArr)
  if (!users) {
    return <LoadingScreen />
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="w-full items-center justify-center px-4 sm:w-1/3">
        <div>
          {/* モバイルでも横並びになるように修正 */}
          <div className="mb-5 flex flex-row space-x-4">
            <RelationStatusLink
              href={'/current/user/followings'}
              text={'フォロー中'}
            />
            <RelationStatusLink
              href={'/current/user/followers'}
              text={'フォローワー'}
            />
          </div>
          <div>
            {users
              .filter((usr) => usr.id !== user.id)
              .map((usr, i: number) => (
                <div
                  key={i}
                  className="mb-4 w-full rounded-lg border border-slate-100"
                >
                  <div className="flex items-center p-3">
                    <Person className="text-gray-600" />
                    <div className="ml-4">
                      <Link
                        href={`/current/follows/${usr.id}`}
                        className="text-sky-500 hover:underline"
                      >
                        <span>
                          {usr.family_name} {usr.given_name}
                        </span>
                      </Link>
                    </div>
                    <div className="ml-auto">
                      {followedIdsArr.includes(usr.id) ? (
                        <OnClickFollowOrUnFollowButton
                          onClick={() => handleClickUnfollowUser(usr.id)}
                          text={'フォロー解除'}
                        />
                      ) : (
                        <OnClickFollowOrUnFollowButton
                          onClick={() => handleClickFollowUser}
                          text={'フォロー'}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            <div className="mt-5 text-center">
              <LinkButton href={'/current/home'} text={'ホームへ'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relationships
