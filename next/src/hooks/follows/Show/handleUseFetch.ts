import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { StudyHoursProps } from '@/types/Management'
import { FollowsUser } from '@/types/User'

export const useFetch = () => {
  const [user] = useUserState()
  const [showUser, setShowUser] = useState<FollowsUser>()
  const [allStudyHours, setAllStudyHours] = useState<StudyHoursProps[]>([])
  const [oneDayStudyHours, setOneDayStudyHours] = useState<StudyHoursProps[]>(
    [],
  )
  const [oneWeekStudyHours, setOneWeekStudyHours] = useState<StudyHoursProps[]>(
    [],
  )
  const [oneMonthStudyHours, setOneMonthStudyHours] = useState<
    StudyHoursProps[]
  >([])
  const [totalHoursWithinOneDay, setTotalHoursWithinOneDay] =
    useState<number>(0)
  const [totalHoursWithinOneWeek, setTotalHoursWithinOneWeek] =
    useState<number>(0)
  const [totalHoursWithinOneMonth, setTotalHoursWithinOneMonth] =
    useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (user.isSignedIn) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/follows/' + id
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          console.log(res.data)
          setShowUser(res.data.another_user)
          setAllStudyHours(res.data.all_study_hours)
          setOneDayStudyHours(res.data.one_day_study_hours)
          setOneWeekStudyHours(res.data.one_week_study_hours)
          setOneMonthStudyHours(res.data.one_month_study_hours)
          setTotalHoursWithinOneDay(res.data.total_hours_within_one_day)
          setTotalHoursWithinOneWeek(res.data.total_hours_within_one_week)
          setTotalHoursWithinOneMonth(res.data.total_hours_within_one_month)
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setError(e.response?.data.error || '予期しないエラーが発生しました')
        })
    }
  }, [id, user.isSignedIn])
  return {
    showUser,
    allStudyHours,
    oneDayStudyHours,
    oneWeekStudyHours,
    oneMonthStudyHours,
    totalHoursWithinOneDay,
    totalHoursWithinOneWeek,
    totalHoursWithinOneMonth,
    error,
  }
}
