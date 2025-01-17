import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextRouter } from 'next/router'
import { EditTodoProps } from '@/types/Todo'

export const onSubmitHandler = (
  id: string | string[] | undefined,
  todo: EditTodoProps | undefined,
  title: string,
  scheduledStudyTime: string,
  progress: string,
  importance: string,
  studyType: string,
  totalHour: number,
  selectedStars: number,
  dueDate: string,
  description: string,
  subject: string,
  actualLearningTime: string,
  router: NextRouter,
  data: EditTodoProps,
) => {
  console.log(data)
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/current/todos/${id}`
  const header = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }

  const patchTitle = title === '' ? todo?.title : title
  const patchScheduledStudyTime =
    scheduledStudyTime === '' ? todo?.scheduled_study_time : scheduledStudyTime

  const patchProgress =
    progress === '未完了'
      ? 'incomplete'
      : progress === '途中'
        ? 'on_the_way'
        : 'complete'

  const patchImportancce =
    importance === '低' ? 'low' : importance === '中' ? 'medium' : 'high'

  const patchStudyType =
    studyType === '予習'
      ? 'preparation'
      : studyType === '授業'
        ? 'lesson'
        : 'review'

  const patchData = {
    form: {
      todo: {
        title: patchTitle,
        scheduled_study_time: patchScheduledStudyTime,
        progress: patchProgress,
        study_type: patchStudyType,
        total_hour: totalHour,
        importance: patchImportancce,
        star_rating: selectedStars,
        due_date: dueDate,
        description: description,
      },
      study_hour: {
        title: patchTitle,
        subject: subject,
        study_type: patchStudyType,
        actual_learning_time: Number(actualLearningTime),
        todo_id: id,
      },
    },
  }

  console.log(patchData)

  axios({ method: 'PATCH', url: url, headers: header, data: patchData })
    .then((res: AxiosResponse) => {
      console.log('更新されました')
      console.log(res.data)
      router.push(`/current/todos/${id}`)
    })
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
}
