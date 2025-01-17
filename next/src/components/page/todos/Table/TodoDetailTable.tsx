import { useState } from 'react'
import { EditAndReturnLink } from '../Link/EditAndReturnLink'
import { StarRating } from '@/components/page/todos/Rating/StarRating'
import { Todo } from '@/types/Todo'
import { formatDate } from '@/utils/formatDate'

export const TodoDetailTable: React.FC<Todo> = ({ todo }: Todo) => {
  const [, setSelectedStars] = useState<number>(0)

  return (
    <div className="mt-4 w-full items-center justify-center bg-white p-4 rounded-lg shadow-md">
      <table className="w-full items-center justify-center bg-sky-700 rounded-t-lg">
        <tbody>
          <tr>
            <th className="h-16 w-full items-center justify-center bg-sky-700 text-center text-white text-lg sm:text-xl">
              Todo情報
            </th>
          </tr>
        </tbody>
      </table>
      {todo ? (
        <div>
          <table className="w-full mt-4">
            <tbody>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">科目</th>
                <td className="p-2 sm:p-4">{todo.subject}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">タイトル</th>
                <td className="p-2 sm:p-4">{todo.title}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">学習タイプ</th>
                <td className="p-2 sm:p-4">{todo.study_type}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">状態</th>
                <td className="p-2 sm:p-4">{todo.progress}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">予定学習時間</th>
                <td className="p-2 sm:p-4">{todo.scheduled_study_time}時間</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">総学習時間</th>
                <td className="p-2 sm:p-4">{todo.total_hour ? todo.total_hour : 0}時間</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">期限</th>
                <td className="p-2 sm:p-4">{formatDate(todo.due_date)}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">重要度</th>
                <td className="p-2 sm:p-4">{todo.importance}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">星評価</th>
                <td className="flex p-2 sm:p-4">
                  <StarRating
                    totalStars={5}
                    selectedStars={todo.star_rating}
                    setSelectedStars={() => setSelectedStars}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="p-2 sm:p-4 w-1/2">本文(感想)</th>
                <td className="p-2 sm:p-4 h-auto">
                  <p>
                    {todo.description
                      ? todo.description
                          .split(/(.{50})/g) // 50文字ごとに分割
                          .map((chunk, index) => (
                            <span key={index}>
                              {chunk}
                              {index % 2 === 1 && <br />}
                            </span>
                          ))
                      : '感想がまだ入力されていません。'}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <EditAndReturnLink id={String(todo.id)} />
        </div>
      ) : (
        <div>No Todo</div>
      )}
    </div>
  )
}