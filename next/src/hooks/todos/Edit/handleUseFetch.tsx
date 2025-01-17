import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { EditTodoProps } from '@/types/Todo'

export const useFetch = () => {
  const [user] = useUserState()
  const [todo, setTodo] = useState<EditTodoProps>()
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState<string>('')
  const [scheduledStudyTime, setScheduledStudyTime] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [progress, setProgress] = useState<string>('')
  const [importance, setImportance] = useState<string>('')
  const [actualLearningTime, setActualLearningTime] = useState<string>('0')
  const [totalHour, setTotalHour] = useState<number>(0)
  const [studyType, setStudyType] = useState<string>('')
  const [selectedStars, setSelectedStars] = useState<number>(0)
  const [dueDate, setDueDate] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/current/todos/${id}/edit`
  useEffect(() => {
    if (user.isSignedIn) {
      //console.log('サインインしています')
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'GET', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          setTodo(res.data)
          console.log(res.data)
          //console.log(`初期レンダリング時の値:::${res.data.progress}`)
          setSubject(res.data.subject)
          setProgress(res.data.progress)
          setScheduledStudyTime(res.data.scheduled_study_time)
          setTotalHour(res.data.total_hour)
          setStudyType(res.data.study_type)
          setDueDate(res.data.due_date)
          //setActualLearningTime(res.data.study_hours.actual_learning_time)
          setImportance(res.data.importance)
          setSelectedStars(res.data.star_rating)
          setDescription(res.data.description)
        })
        .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
    }
  }, [id, user.isSignedIn, url])

  return {
    user,
    todo,
    setTodo,
    router,
    id,
    title,
    setTitle,
    scheduledStudyTime,
    setScheduledStudyTime,
    subject,
    setSubject,
    progress,
    setProgress,
    importance,
    setImportance,
    actualLearningTime,
    setActualLearningTime,
    totalHour,
    setTotalHour,
    studyType,
    setStudyType,
    selectedStars,
    setSelectedStars,
    dueDate,
    setDueDate,
    description,
    setDescription,
    url,
  }
}
