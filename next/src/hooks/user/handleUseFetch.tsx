import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useUserState } from '../useGlobalState'

export const useFetch = () => {
  const [user] = useUserState()

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user'

  useEffect(() => {
    if (user.isSignedIn) {
      const header = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: header })
        .then((res: AxiosResponse) => {
          console.log(`初期レンダリング時の値:::${res.data}`)
        })
        .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
    }
  }, [user.isSignedIn, url])
  return {
    user,
  }
}
