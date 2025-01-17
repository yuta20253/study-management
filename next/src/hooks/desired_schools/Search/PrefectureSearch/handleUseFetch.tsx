import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { UniversityPrefecture } from '@/types/DesiredSchool'

export const useFetch = () => {
  const [user] = useUserState()
  const [universities, setUniversities] = useState<UniversityPrefecture[]>([])
  useEffect(() => {
    if (user.isSignedIn) {
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }

      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL +
        '/current/desired_schools/search/prefecture_searches'
      axios({ method: 'GET', headers: headers, url: url })
        .then((res: AxiosResponse) => setUniversities(res.data.universities))
        .catch((err: AxiosError<{ error: string }>) => console.log(err.message))
    }
  }, [user.isSignedIn])
  return {
    user,
    universities,
    setUniversities,
  }
}
