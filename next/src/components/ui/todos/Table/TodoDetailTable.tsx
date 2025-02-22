import { useState } from 'react'
import { LinkAndButton } from '../Link&Button/LinkAndButton'
import { StarRating } from '@/hooks/ui/todos/Rating/StarRating'
import { Todo } from '@/types/Todo'
import { formatDate } from '@/utils/formatDate'

export const TodoDetailTable: React.FC<Todo> = ({ todo }: Todo) => {
  const [, setSelectedStars] = useState<number>(0)
  console.log(todo.due_date)
  return (
    <div className="mt-1 w-full items-center justify-center">
      <table className="flex h-16 w-full items-center justify-center bg-sky-700">
        <tbody>
          <tr>
            <th className="h-16 w-full items-center justify-center bg-sky-700 text-center">
              <p className="text-center text-white">Todo情報</p>
            </th>
          </tr>
        </tbody>
      </table>
      {todo ? (
        <div>
          <div>
            <table className="h-12 w-full items-center justify-center">
              <tbody>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">科目</th>
                  <td className="h-8 w-1/2">{todo.subject}</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">タイトル</th>
                  <td className="h-8 w-1/2">{todo.title}</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">学習タイプ</th>
                  <td className="h-8 w-1/2">{todo.study_type}</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">状態</th>
                  <td className="h-8 w-1/2">{todo.progress}</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">予定学習時間</th>
                  <td className="h-8 w-1/2">{todo.scheduled_study_time}時間</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">総学習時間</th>
                  <td className="h-8 w-1/2">
                    {todo.total_hour ? todo.total_hour : 0}時間
                  </td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">期限</th>
                  <td className="h-8 w-1/2">{formatDate(todo.due_date)}</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">重要度</th>
                  <td className="h-8 w-1/2">{todo.importance}</td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">星評価</th>
                  <td className="flex h-8 w-1/2">
                    <StarRating
                      totalStars={5}
                      selectedStars={todo.star_rating}
                      setSelectedStars={() => setSelectedStars}
                    />
                  </td>
                </tr>
                <tr className="w-full">
                  <th className="mt-2 h-12 w-1/2">本文(感想)</th>
                  <td className="h-8 w-1/2">{todo.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <LinkAndButton id={String(todo.id)} />
        </div>
      ) : (
        <div>No Todo</div>
      )}
    </div>
  )
}
