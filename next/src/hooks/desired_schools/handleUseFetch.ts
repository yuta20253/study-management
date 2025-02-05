import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '../useGlobalState'
import { University, DesiredSchoolProps } from '@/types/DesiredSchool'

export const useFetch = () => {
  const [user] = useUserState()
  const [universities, setUniversities] = useState<
    DesiredSchoolProps[] | undefined
  >([])
  const [jsonUniversity, setJsonUniversity] = useState<University[][]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/desired_schools'
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          setJsonUniversity(res.data.universities_data)
          setUniversities(res.data.universities)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          if (e.response) {
            const status = e.response.status
            const message =
              e.response.data.error || '予期せぬエラーが発生しました'
            if (status === 400) {
              setError(message)
            } else if (status === 404) {
              setError('データが見つかりません')
            } else if (status === 500) {
              setError('サーバー内部エラー')
            } else {
              setError('不明なエラーが発生しました')
            }
          } else {
            setError('ネットワークエラーが発生しました')
          }
        })
    }
  }, [user.isSignedIn])
  return {
    jsonUniversity,
    universities,
    setUniversities,
    error,
    setError,
  }
}
