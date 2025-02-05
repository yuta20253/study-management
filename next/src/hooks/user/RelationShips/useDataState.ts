import { useRouter } from 'next/router'
import { useClickFollowUserHandlers } from './clickFollowUser'
import { useClickUnFollowUserHandlers } from './clickUnFollowUser'
import { useFetch } from './handleUseFetch'

export const useDataState = () => {
  const router = useRouter()

  const { user, users, followedIdsArr, error } = useFetch()

  const { handleClickUnfollowUser } = useClickUnFollowUserHandlers(router)

  const { handleClickFollowUser } = useClickFollowUserHandlers(router)

  return {
    user,
    users,
    followedIdsArr,
    handleClickUnfollowUser,
    handleClickFollowUser,
    error,
  }
}
