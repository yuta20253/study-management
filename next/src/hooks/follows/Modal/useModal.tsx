import { StudyTypeTranslation } from '@/const/studyTypeTranslation'
import { ModalProps } from '@/types/Follows/Modal/modal'
import { StudyHoursProps } from '@/types/Management'

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  studyHours,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-1/2 rounded-lg bg-white p-4 shadow-lg sm:w-3/4 sm:p-6 md:w-1/2 ">
        <h3 className="mb-4 text-xl font-bold">{title}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">科目</th>
                <th className="px-4 py-2">タイトル</th>
                <th className="px-4 py-2">状況</th>
                <th className="px-4 py-2">学習時間</th>
              </tr>
            </thead>
            <tbody>
              {studyHours.map((studyHour: StudyHoursProps, i: number) => (
                <tr key={i}>
                  <td className="border px-4 py-2 text-center">
                    {studyHour.subject}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {studyHour.title}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {StudyTypeTranslation[studyHour.study_type]}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {studyHour.actual_learning_time}時間
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
