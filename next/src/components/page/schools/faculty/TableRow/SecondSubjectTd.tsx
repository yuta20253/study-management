import { Faculty } from '@/types/Schools/Faculty/faculty'
type DataProps = {
  faculty: Faculty
}

export const SecondSubjectTd = ({ faculty }: DataProps) => {
  return (
    <>
      {faculty.faculty_data.second_exam_subjects[0]['english'] ||
      faculty.faculty_data.second_exam_subjects[0]['english_alternative'] ? (
        <td className="w-1/6 justify-center border-r border-gray-500 text-center">
          {faculty.faculty_data.second_exam_subjects[0]['english']}
          {faculty.faculty_data.second_exam_subjects[0]['english_alternative']}
        </td>
      ) : (
        <td className="h-7 w-1/6 justify-center border-b border-gray-500 text-center"></td>
      )}
      <td className="w-1/6 justify-center border-r border-gray-500 text-center">
        {faculty.faculty_data.second_exam_subjects[0]['math']}
        {faculty.faculty_data.second_exam_subjects[0]['math_alternative']}
      </td>
      <td className="w-1/6 justify-center border-r border-gray-500 text-center">
        {faculty.faculty_data.second_exam_subjects[0]['nationallang']}
        {
          faculty.faculty_data.second_exam_subjects[0][
            'nationallang_alternative'
          ]
        }
      </td>
      <td className="w-1/6 justify-center border-r border-gray-500 text-center">
        {faculty.faculty_data.second_exam_subjects[0]['science']}
        {faculty.faculty_data.second_exam_subjects[0]['science_alternative']}
      </td>
      <td className="w-1/6 justify-center border-r border-gray-500 text-center">
        {
          faculty.faculty_data.second_exam_subjects[0][
            'geographical_history_citizens'
          ]
        }
        {
          faculty.faculty_data.second_exam_subjects[0][
            'geographical_history_citizens_alternative'
          ]
        }
      </td>
      <td className="w-1/6 justify-center border-gray-500 text-center">
        {faculty.faculty_data.second_exam_subjects[0]['essay']}
      </td>
    </>
  )
}
