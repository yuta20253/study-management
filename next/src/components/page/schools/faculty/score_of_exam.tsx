import { FirstSubjectTd } from './TableRow/FirstSubjectTd'
import { FirstSubjectTh } from './TableRow/FirstSubjectTh'
import { ScoreOfExamInfoTr } from './TableRow/ScoreOfExamInfoTr'
import { SecondSubjectEtcTd } from './TableRow/SecondSubjectEtcTd'
import { SecondSubjectTd } from './TableRow/SecondSubjectTd'
import {
  SecondSubjectTh,
  SecondSubjectThWithSpan,
} from './TableRow/SecondSubjectTh'
import { TestTheme } from './TableRow/TestTheme'
import { FacultyProps } from '@/types/Schools/Faculty/faculty'

export const ScoreOfExam: React.FC<FacultyProps> = ({
  faculty,
}: FacultyProps) => {
  console.log('子コンポーネントです')
  console.log(faculty)
  return (
    <div className="m-auto flex w-1/2 items-center justify-center">
      <table className="m-auto border-collapse border border-gray-500">
        <tbody className="w-full">
          <ScoreOfExamInfoTr
            title="地域区分"
            data1={faculty.faculty_data.region}
          />
          <ScoreOfExamInfoTr
            title="学校区分"
            data1={faculty.faculty_data.division}
          />
          <ScoreOfExamInfoTr
            title="大学"
            data1={faculty.faculty_data.university}
          />
          <ScoreOfExamInfoTr
            title="学部"
            data1={faculty.faculty_data.faculty}
          />
          <ScoreOfExamInfoTr
            title="学科"
            data1={faculty.faculty_data.department}
          />
          <ScoreOfExamInfoTr
            title="学部系統"
            data1={faculty.faculty_data.undergraduate_system}
          />
          <ScoreOfExamInfoTr
            title="偏差値"
            data1={faculty.faculty_data.deviation_value}
          />
        </tbody>
        <TestTheme title="共通テスト受験科目" />
        <tbody className="w-full justify-center border-gray-500 ">
          {faculty.faculty_data.first_exam_subjects ? (
            <>
              <tr className="flex">
                <FirstSubjectTh title="英語" />
                <FirstSubjectTh title="数学" />
                <FirstSubjectTh title="国語" />
                <FirstSubjectTh title="理科" />
                <FirstSubjectTh title="社会" />
                <FirstSubjectTh title="情報" />
              </tr>
            </>
          ) : (
            <></>
          )}
          {faculty.faculty_data.first_exam_subjects ? (
            <tr className="flex">
              <FirstSubjectTd faculty={faculty} />
            </tr>
          ) : (
            <></>
          )}
        </tbody>
        <TestTheme title="２次・個別学力試験受験科目" />
        <tbody className="w-full justify-center ">
          <tr className="flex">
            <SecondSubjectTh title="英語" />
            <SecondSubjectTh title="数学" />
            <SecondSubjectTh title="国語" />
            <SecondSubjectTh title="理科" />
            <SecondSubjectTh title="社会" />
            <SecondSubjectTh title="小論文" />
          </tr>
          <tr className="flex">
            <SecondSubjectTd faculty={faculty} />
          </tr>
        </tbody>

        <tbody className="w-full justify-center">
          <tr className="flex">
            <SecondSubjectThWithSpan title="実技" style="text-sm" />
            <SecondSubjectThWithSpan title="総合問題" style="text-sm" />
            <SecondSubjectThWithSpan title="英語資格" style="text-xs/3" />
            <th className="w-1/2 border-0 border-gray-500 bg-sky-500 text-white"></th>
          </tr>
          <tr className="flex">
            <SecondSubjectEtcTd faculty={faculty} />
          </tr>
        </tbody>

        <tbody className="w-full">
          <ScoreOfExamInfoTr
            title="募集定員"
            data1={faculty.faculty_data.capacity}
          />
          <tr className="flex">
            <th className="w-1/2 items-center justify-center bg-sky-600 text-white">
              学部学科紹介
            </th>
            {faculty.faculty_data.explanation ? (
              <td className="w-[359px] border-l border-gray-500">
                {faculty.faculty_data.explanation}
              </td>
            ) : (
              <td className="w-[359px] border-l border-t border-gray-500"></td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
