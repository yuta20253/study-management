import { useState } from 'react'
import { TodoInfoTr } from './TableRow/TodoInfoTr'
import { StarRating } from '@/components/page/todos/Rating/StarRating'
import { TodoDetailProps } from '@/types/Todo'
import { formatDate } from '@/utils/formatDate'

export const TodoDetail = ({ todo, setTodoDetail }: TodoDetailProps) => {
  const [, setSelectedStars] = useState<number>(0)

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black">
      <div className="w-11/12 overflow-auto rounded-lg bg-cyan-100 p-4 sm:w-1/3">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="h-16 rounded-t-lg bg-sky-700 py-2 text-center text-2xl text-white">
                  Todo詳細
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-300">
                <th className="p-2 text-left text-sm sm:text-base">科目</th>
                <td className="p-2 text-sm sm:text-base">{todo.subject}</td>
              </tr>
              <TodoInfoTr title="タイトル" data1={todo.title} />
              <TodoInfoTr title="学習タイプ" data1={todo.study_type} />
              <TodoInfoTr title="状態" data1={todo.progress} />
              <TodoInfoTr
                title="予定学習時間"
                data1={todo.scheduled_study_time}
              />
              <TodoInfoTr
                title="総学習時間"
                data1={todo.total_hour ? todo.total_hour : 0}
              />
              <TodoInfoTr title="期限" data1={formatDate(todo.due_date)} />
              <TodoInfoTr title="重要度" data1={todo.importance} />
              <tr className="border-t border-gray-300">
                <th className="p-2 text-left text-sm sm:text-base">星評価</th>
                <td className="flex p-2">
                  <StarRating
                    totalStars={5}
                    selectedStars={todo.star_rating}
                    setSelectedStars={() => setSelectedStars}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-center">
            <button
              className="w-full rounded-lg bg-sky-500 px-4 py-2 text-white sm:w-auto"
              onClick={() => {
                setTodoDetail && setTodoDetail(undefined)
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
