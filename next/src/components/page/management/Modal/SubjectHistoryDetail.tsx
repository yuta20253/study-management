import { Dispatch, SetStateAction } from 'react'
import { formatDate } from '@/utils/formatDate'

type StudyHoursProps = {
  title: string
  subject: string
  study_type: string
  actual_learning_time: number
  created_at: Date
}

type SubjectHistoryProps = {
  subjectLists: StudyHoursProps[]
  subject: string
  setSecondModalOpen: Dispatch<SetStateAction<boolean>>
}
export const SubjectHistoryDetail = ({
  subjectLists,
  subject,
  setSecondModalOpen,
}: SubjectHistoryProps) => {
  console.log('２つ目のモーダルも開きました')
  console.log(subject)
  return (
    <div className="flex size-full items-center justify-center">
      <div className="size-full items-center justify-center bg-slate-200">
        <div className=" h-full bg-sky-700">
          <div className="h-10">
            <p className="h-10 p-2 text-center text-lg text-white">{subject}</p>
          </div>
        </div>
        <div className="mb-2 h-10">
          <p className="m-2 h-10 bg-slate-200 p-2 text-center text-lg">履歴</p>
        </div>
        <div className="m-2 mb-4">
          <div>
            <table className="m-auto size-full items-center justify-center">
              <thead>
                <tr>
                  <th className="mx-4">
                    <p className="mx-4">日時</p>
                  </th>
                  <th className="mx-4">
                    <p className="mx-4">学習時間</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjectLists
                  .filter((study) => {
                    return study.subject === subject
                  })
                  .map((stu, i: number) => (
                    <tr key={i}>
                      <td className="mx-4">
                        <p className="mx-4 text-center">
                          {formatDate(stu.created_at)}
                        </p>
                      </td>
                      <td className="mx-4">
                        <p className="mx-4 text-center">
                          {stu.actual_learning_time}時間
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="float-right m-4 inline-block rounded bg-sky-500">
            <button
              onClick={() => setSecondModalOpen(false)}
              className="rounded"
            >
              <p className="m-2 text-center text-white">閉じる</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
