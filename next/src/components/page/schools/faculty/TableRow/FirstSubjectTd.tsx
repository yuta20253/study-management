import { FacultyProps } from '@/types/Schools/Faculty/table'

export const FirstSubjectTd = ({ faculty }: FacultyProps) => {
  return (
    <>
      <td className="w-1/6 justify-center border-l-0 border-r border-gray-500 text-center">
        {faculty.faculty_data.first_exam_subjects[0]['english']}
        {faculty.faculty_data.first_exam_subjects[0]['english_alternative']}
      </td>
      <td className="w-1/6 justify-center border-l-0 border-r border-gray-500 text-center">
        {faculty.faculty_data.first_exam_subjects[0]['math']}
        {faculty.faculty_data.first_exam_subjects[0]['math_alternative']}
      </td>
      <td className="w-1/6 justify-center border-l-0 border-r border-gray-500 text-center">
        {faculty.faculty_data.first_exam_subjects[0]['nationallang']}
        {
          faculty.faculty_data.first_exam_subjects[0][
            'nationallang_alternative'
          ]
        }
      </td>
      <td className="w-1/6 justify-center border-l-0 border-r border-gray-500 text-center">
        {faculty.faculty_data.first_exam_subjects[0]['science']}
        {faculty.faculty_data.first_exam_subjects[0]['science_alternative']}
      </td>
      <td className="w-1/6 justify-center border-l-0 border-r border-gray-500 text-center">
        {
          faculty.faculty_data.first_exam_subjects[0][
            'geographical_history_citizens'
          ]
        }
        {
          faculty.faculty_data.first_exam_subjects[0][
            'geographical_history_citizens_alternative'
          ]
        }
      </td>
      <td className="w-1/6 justify-center border-x-0 border-gray-500 text-center">
        {faculty.faculty_data.first_exam_subjects[0]['information']}
        {faculty.faculty_data.first_exam_subjects[0]['information_alternative']}
      </td>
    </>
  )
}
