import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { NewUniversity } from '@/types/DesiredSchool'

export const useFetch = () => {
  const [user] = useUserState()
  const [jsonUniversity, setJsonUniversity] = useState<NewUniversity[][]>([[]])
  const router = useRouter()
  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/desired_schools/new'
      const header = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: header })
        .then((res: AxiosResponse) => setJsonUniversity(res.data))
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          router.push('/current/desired_schools')
        })
    }
  }, [user.isSignedIn, router])
  return {
    user,
    jsonUniversity,
    setJsonUniversity,
    router,
  }
}
