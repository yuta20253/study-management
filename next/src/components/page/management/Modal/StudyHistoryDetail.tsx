import { StudyHistoryProps } from '@/types/Management/Modal/modal'
import { formatDate } from '@/utils/Common/formatDate'

export const StudyHistoryDetail = ({
  studyLists,
  title,
  todo_id,
  onClose,
}: StudyHistoryProps) => {
  console.log('モーダルが押されました')

  const firstTodo = studyLists?.find((list) => list.todo.id === todo_id)
  console.log(`firstTodo:::::${firstTodo?.title}`)
  if (!firstTodo) return <div>Loading...</div>
  console.log(`TodoId:::${todo_id}`)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg sm:max-w-3xl">
        <div className="bg-sky-700 p-4">
          <p className="text-center text-lg text-white">{title}</p>
        </div>
        <div className="m-2">
          <p className="m-2 bg-slate-100 py-2 text-center text-2xl">履歴</p>
        </div>
        <div>
          <div className="mx-4 bg-slate-300">
            <div className="flex items-center justify-between gap-10 py-2">
              <div>
                <p className="text-center text-lg">現在の状況</p>
              </div>
              <div>
                {firstTodo.todo.progress === 'incomplete'
                  ? '未完了'
                  : firstTodo.todo.progress === 'on_the_way'
                    ? '途中'
                    : '完了'}
              </div>
            </div>
          </div>
          <div className="m-2 mb-4">
            <table className="mx-auto w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <p className="text-center">日時</p>
                  </th>
                  <th className="px-4 py-2">
                    <p className="text-center">学習時間</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {studyLists
                  .filter((study) => study.title === title)
                  .map((stu, i: number) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">
                        <p className="text-center">
                          {formatDate(stu.created_at)}
                        </p>
                      </td>
                      <td className="px-4 py-2">
                        <p className="text-center">
                          {stu.actual_learning_time}時間
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="float-right m-4 inline-block rounded bg-sky-500">
              <button
                onClick={onClose}
                className="rounded px-4 py-2 text-white"
              >
                <p className="m-2 text-center">閉じる</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
