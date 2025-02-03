import { useEffect, useState } from 'react'
import { SelectSubject } from './Option/selectSubject'
import { StarRating } from '@/components/page/todos/Rating/StarRating'
import { useHandleSubmit } from '@/hooks/todos/Modal/useHandleSubmit'
import { ClickProps } from '@/types/Todo/createNewTodo/newTodo'

export const CreateNewTodoModal = ({ onClose }: ClickProps) => {
  const [selectedStars, setSelectedStars] = useState<number>(0)
  const [dueDate, setDueDate] = useState<string>()

  const { handleSubmit, register, onSubmit } = useHandleSubmit(String(dueDate))
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

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
                    onChange={(e) => setDueDate(e.target.value)}
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
