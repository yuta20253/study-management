import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Subjects } from '@/const/subject'
import { StarRating } from '@/hooks/ui/todos/Rating/StarRating'
import { TodoProps, ClickProps } from '@/types/Todo/createNewTodo/newTodo'

export const CreateNewTodoModal = ({ onClose }: ClickProps) => {
  const router = useRouter()
  const [selectedStars, setSelectedStars] = useState<number>(0)

  const { handleSubmit, register } = useForm<TodoProps>({
    defaultValues: {
      subject: '',
      title: '',
      description: '',
      progress: 'incomplete',
      study_type: 'preparation',
      scheduled_study_time: 0,
      actual_learning_time: 0,
      due_date: new Date(),
      importance: 0,
      star_rating: 1,
    },
  })

  const onSubmit: SubmitHandler<TodoProps> = (data) => {
    console.log(data)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/todos'
    const header = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const postStudyType =
      data.study_type === '予習'
        ? 'preparation'
        : data.study_type === '授業'
          ? 'lesson'
          : 'review'

    const postData = {
      ...data,
      study_type: postStudyType,
    }

    axios({ method: 'POST', url: url, headers: header, data: postData })
      .then((res: AxiosResponse) => {
        console.log('Todoを追加しました')
        console.log(res.data)
        window.location.reload()
        //router.push('/current/todos')
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
  }

  const SelectSubject = Subjects.map((subject: string, i: number) => {
    return (
      <option value={subject} key={i}>
        {subject}
      </option>
    )
  })

  return (
    <div className="absolute top-10 z-10 mt-28 flex h-full w-1/2 items-center justify-center">
      <div className="flex w-full items-center  justify-center rounded bg-cyan-100">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <table className="w-full items-center justify-center">
            <tbody>
              <tr>
                <th className="mt-2 h-16 w-full items-center justify-center bg-sky-700">
                  <p className="text-2xl text-white">Todo情報</p>
                </th>
              </tr>
            </tbody>
          </table>
          <table className="w-full items-center justify-center">
            <tbody>
              <tr>
                <th className="mt-2 h-16 ">科目</th>
                <td>
                  <select
                    className="h-8 w-3/4"
                    defaultValue={'英語'}
                    {...register('subject', { required: true })}
                  >
                    {SelectSubject}
                  </select>
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 items-center justify-center">
                  タイトル
                </th>
                <td>
                  <input
                    className="h-8 w-3/4"
                    type="text"
                    defaultValue={''}
                    {...register('title', { maxLength: 25 })}
                  />
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 items-center justify-center">
                  学習タイプ
                </th>
                <td>
                  <select
                    className="h-8 w-3/4"
                    defaultValue={'予習'}
                    {...register('study_type', { required: true })}
                  >
                    <option value={'予習'}>予習</option>
                    <option value={'授業'}>授業</option>
                    <option value={'復習'}>復習</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th className="mt-2 h-16 items-center justify-center">
                  予定学習時間
                </th>
                <td>
                  <input
                    className="h-8 w-3/4"
                    type="text"
                    defaultValue={0}
                    {...register('scheduled_study_time')}
                  />
                  時間
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 items-center justify-center">期限</th>
                <td>
                  <input
                    className="h-8 w-3/4"
                    type="date"
                    defaultValue={String(new Date())}
                  />
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 items-center justify-center">
                  重要度
                </th>
                <td>
                  <select
                    className="h-8 w-3/4"
                    defaultValue={'low'}
                    {...register('importance', { required: true })}
                  >
                    <option value={'low'}>低</option>
                    <option value={'medium'}>中</option>
                    <option value={'high'}>高</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 items-center justify-center">
                  星評価
                </th>
                <td className="mt-6 flex items-center">
                  <StarRating
                    totalStars={5}
                    selectedStars={selectedStars}
                    setSelectedStars={setSelectedStars}
                  />
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-32 items-center justify-center">
                  本文(感想)
                </th>
                <td>
                  <textarea
                    className="h-32 w-3/4"
                    defaultValue={''}
                    {...register('description')}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-center gap-8 py-1">
            <div>
              <button
                className="rounded bg-sky-500 px-3 py-1 text-white"
                type="submit"
              >
                新規作成
              </button>
            </div>
            <div>
              <button
                className="rounded bg-sky-500 px-3 py-1 text-white"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
