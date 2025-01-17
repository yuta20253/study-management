import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { StarRating } from '@/components/page/todos/Rating/StarRating'
import { Subjects } from '@/const/subject'
import { TodoProps, ClickProps } from '@/types/Todo/createNewTodo/newTodo'

export const CreateNewTodoModal = ({ onClose }: ClickProps) => {
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const onSubmit: SubmitHandler<TodoProps> = async (data) => {
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

    try {
      const response = await axios({
        method: 'POST',
        url: url,
        headers: header,
        data: postData,
      })
      console.log('Todoを追加しました', response.data)
      window.location.reload()
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        alert('エラーが発生しました。もう一度お試しください。')
      } else if (axiosError.request) {
        alert('ネットワークエラーです。確認してください。')
      } else {
        alert('予期しないエラーが発生しました。')
      }
    }
  }

  const SelectSubject = Subjects.map((subject: string, i: number) => {
    return (
      <option value={subject} key={i}>
        {subject}
      </option>
    )
  })

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black">
      <div className="flex max-h-screen w-full items-center justify-center overflow-auto rounded bg-cyan-100 p-4 sm:w-3/4 sm:p-6 md:w-2/3 lg:w-1/2 lg:p-8">
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
                <th className="mt-2 h-16 text-sm sm:text-base">科目</th>
                <td>
                  <select
                    className="h-8 w-full sm:w-full md:w-3/4"
                    defaultValue={'英語'}
                    {...register('subject', { required: true })}
                  >
                    {SelectSubject}
                  </select>
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 text-sm sm:text-base">タイトル</th>
                <td>
                  <input
                    className="h-8 w-full sm:w-full md:w-3/4"
                    type="text"
                    defaultValue={''}
                    {...register('title', { maxLength: 25 })}
                  />
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 text-sm sm:text-base">学習タイプ</th>
                <td>
                  <select
                    className="h-8 w-full sm:w-full md:w-3/4"
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
                <th className="mt-2 h-16 text-sm sm:text-base">予定学習時間</th>
                <td>
                  <input
                    className="h-8 w-full sm:w-full md:w-3/4"
                    type="text"
                    defaultValue={0}
                    {...register('scheduled_study_time')}
                  />
                  時間
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 text-sm sm:text-base">期限</th>
                <td>
                  <input
                    className="h-8 w-full sm:w-full md:w-3/4"
                    type="date"
                    defaultValue={String(new Date())}
                  />
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-16 text-sm sm:text-base">重要度</th>
                <td>
                  <select
                    className="h-8 w-full sm:w-full md:w-3/4"
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
                <th className="mt-2 h-16 text-sm sm:text-base">星評価</th>
                <td className="mt-6 flex items-center justify-start sm:justify-center">
                  <StarRating
                    totalStars={5}
                    selectedStars={selectedStars}
                    setSelectedStars={setSelectedStars}
                  />
                </td>
              </tr>
              <tr>
                <th className="mt-2 h-32 text-sm sm:text-base">本文(感想)</th>
                <td>
                  <textarea
                    className="h-32 w-full sm:w-full md:w-3/4"
                    defaultValue={''}
                    {...register('description')}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col items-center justify-center gap-8 py-2 sm:flex-row sm:py-4">
            <div className="w-full sm:w-auto">
              <button
                className="w-full rounded bg-sky-500 px-3 py-1 text-white sm:w-auto"
                type="submit"
              >
                新規作成
              </button>
            </div>
            <div className="w-full sm:w-auto">
              <button
                className="w-full rounded bg-sky-500 px-3 py-1 text-white sm:w-auto"
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
