import { Faculty } from '@/types/Schools/Faculty/faculty'
type DataProps = {
  faculty: Faculty
}

export const SecondSubjectEtcTd = ({ faculty }: DataProps) => {
  return (
    <>
      {faculty.faculty_data.second_exam_subjects[0]['practical_skills'] ? (
        <td className="w-1/6 justify-center border-b border-r border-gray-500 text-center">
          {faculty.faculty_data.second_exam_subjects[0]['practical_skills']}
        </td>
      ) : (
        <td className="h-7 w-1/6 justify-center border-b border-r border-gray-500 text-center"></td>
      )}
      {faculty.faculty_data.second_exam_subjects[0][
        'comprehensive_question'
      ] ? (
        <td className="w-1/6 justify-center border-x-0 border-b border-gray-500 text-center">
          {
            faculty.faculty_data.second_exam_subjects[0][
              'comprehensive_question'
            ]
          }
        </td>
      ) : (
        <td className="h-7 w-1/6 justify-center border-b border-r-0 border-gray-500 text-center"></td>
      )}
      {faculty.faculty_data.second_exam_subjects[0]['certification_exam'] ? (
        <td className="w-1/6 justify-center border-b border-r border-gray-500 text-center">
          {faculty.faculty_data.second_exam_subjects[0]['certification_exam']}
        </td>
      ) : (
        <td className="h-7 w-1/6 justify-center border-x border-b border-gray-500  p-1 text-center"></td>
      )}
      <td className="w-1/2 border-b border-gray-500  text-white"></td>
    </>
  )
}
