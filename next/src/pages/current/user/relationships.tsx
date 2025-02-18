import Person from '@mui/icons-material/Person'
import { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import LinkButton from '@/components/page/Common/LinkButton'
//import OnClickFollowOrUnFollowButton from '@/components/page/user/Button/handleOnClickFollowOrUnFollowButton'
import RelationStatusLink from '@/components/page/user/Link/RelationStatusLink'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { useDataState } from '@/hooks/user/RelationShips/useDataState'

const Relationships: NextPage = () => {
  useRequireSignedIn()
  const {
    user,
    users,
    followedIdsArr,
    handleClickUnfollowUser,
    handleClickFollowUser,
    error,
  } = useDataState()

  if (!users) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <ErrorTemplate error={error} href={'/current/home'} text={'ホームへ'} />
    )
  }

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="w-full items-center justify-center px-4 sm:w-1/3">
        <div>
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
                      <span>
                        {usr.family_name} {usr.given_name}
                      </span>
                    </div>
                    <div className="ml-auto">
                      {followedIdsArr.includes(usr.id) ? (
                        <button
                          onClick={() => handleClickUnfollowUser(usr.id)}
                          className="rounded bg-sky-400 px-3 py-1 text-white"
                        >
                          フォロー解除
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClickFollowUser(usr.id)}
                          className="rounded bg-sky-400 px-3 py-1 text-white"
                        >
                          フォロー
                        </button>
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
