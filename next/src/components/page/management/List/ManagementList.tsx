import { Management } from '@/types/Management/List/list'
import { formatDate } from '@/utils/formatDate'

export const ManagementList: React.FC<Management> = ({
  studyHours,
  selectedSubject,
  selectedPeriod,
  studyType,
  onOpen,
  handleClickStudy,
}: Management) => {
  if (!studyHours) return null

  // デフォルトのstudyTypeが未選択の場合は'all'に設定
  const filteredStudyHours = studyHours
    .filter((study) => {
      // selectedPeriodが未選択ならフィルタリングしない
      if (selectedPeriod && new Date(study.created_at) < selectedPeriod) {
        return false
      }
      return true
    })
    .filter((study) => {
      // selectedSubjectが未選択ならフィルタリングしない
      if (selectedSubject && study.subject !== selectedSubject) {
        return false
      }
      return true
    })
    .filter((study) => {
      // studyTypeが未選択ならすべてのstudyTypeを表示
      if (studyType === 'all') {
        return true
      }
      return study.study_type === studyType
    })

  return (
    <table className="w-2/3 items-center justify-center">
      <thead>
        <tr className="bg-sky-700">
          <th className="px-4 py-2 text-center text-white">科目</th>
          <th className="px-4 py-2 text-center text-white">タイトル</th>
          <th className="px-4 py-2 text-center text-white">学習タイプ</th>
          <th className="px-4 py-2 text-center text-white">学習時間</th>
          <th className="px-4 py-2 text-center text-white">登録日時</th>
        </tr>
      </thead>
      <tbody>
        {filteredStudyHours.map((study, i: number) => (
          <tr key={i} className="border-t">
            <td className="px-4 py-2 text-center">{study.subject}</td>
            <td
              className="px-4 py-2 text-center"
              onClick={onOpen}
              onClickCapture={() => handleClickStudy(study)}
            >
              {study.title}
            </td>
            <td className="px-4 py-2 text-center">
              {study.study_type === 'preparation'
                ? '予習'
                : study.study_type === 'lesson'
                  ? '授業'
                  : '復習'}
            </td>
            <td className="px-4 py-2 text-center">
              {study.actual_learning_time}時間
            </td>
            <td className="px-4 py-2 text-center">
              {formatDate(study.created_at)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
