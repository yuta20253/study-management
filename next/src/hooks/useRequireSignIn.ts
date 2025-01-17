import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from './useGlobalState'

export function useRequireSignedIn() {
  const router = useRouter()
  const [user] = useUserState()

  useEffect(() => {
    if (user && user.isFetched && !user.isSignedIn) {
      router.push('/sign_in')
    }
  }, [user, router])
}
