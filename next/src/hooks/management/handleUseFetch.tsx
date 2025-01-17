import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useUserState } from '../useGlobalState'
import { StudyHoursProps } from '@/types/Management'

export const useFetch = () => {
  const [user] = useUserState()
  const [studyHours, setStudyHours] = useState<StudyHoursProps[]>()
  const [studyLists, setStudyLists] = useState<StudyHoursProps[]>([])
  const [allStudyHours, setAllStudyHours] = useState<StudyHoursProps[]>()
  const [selectedSubject, setSelectedSubject] = useState<string>('英語')
  const [studyType, setStudyType] = useState<string>('全て')
  const [selectSubjectProps, setSelectSubjectProps] = useState<
    StudyHoursProps[]
  >([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (user.isSignedIn) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/management'
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }

      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          console.log(res)
          setStudyHours(res.data.study_hours)
          setStudyLists(res.data.study_hours)
          setAllStudyHours(res.data.all_study_hours)
          setSelectSubjectProps(res.data.study_hours)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          if (e.response) {
            setErrorMessage(
              e.response.data.error || '予期しないエラーが発生しました',
            )
          } else if (e.request) {
            setErrorMessage(
              'サーバーからの応答がありません。ネットワーク接続を確認してください。',
            )
          } else {
            setErrorMessage('エラーが発生しました: ' + e.message)
          }
        })
    }
  }, [user.isSignedIn])

  return {
    user,
    studyHours,
    studyLists,
    allStudyHours,
    selectedSubject,
    setSelectedSubject,
    studyType,
    setStudyType,
    selectSubjectProps,
    errorMessage,
  }
}
