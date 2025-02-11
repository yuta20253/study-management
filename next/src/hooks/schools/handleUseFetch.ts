import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '../useGlobalState'
import { University } from '@/types/Schools/schoolId'

export const useFetch = () => {
  const [user] = useUserState()
  const [university, setUniversity] = useState<University>()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { school_id } = router.query
  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + `/current/schools/${school_id}`
      const header = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', headers: header, url: url })
        .then((res: AxiosResponse) => {
          console.log('取得成功')
          console.log(res.data)
          setUniversity(res.data.university_data)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setError(e.response?.data.error || '予期しないエラーが発生しました')
        })
    }
  }, [school_id, user.isSignedIn])

  return {
    university,
    school_id,
    error,
  }
}
