import { Dispatch, SetStateAction } from 'react'
import { FieldErrors } from 'react-hook-form'
import { TodoEditActualLearningTime } from './TodoEditActualLearningTimeInput'
import { TodoEditDescription } from './TodoEditDescription'
import { TodoEditDueDate } from './TodoEditDueDate'
import { TodoEditImportance } from './TodoEditImportance'
import { TodoEditProgress } from './TodoEditProgress'
import { TodoEditScheduledStudyTime } from './TodoEditScheduledStudyTime'
import { TodoEditStarValues } from './TodoEditStarValues'
import { TodoEditStudyType } from './TodoEditStudyType'
import { TodoEditSubject } from './TodoEditSubject'
import { TodoEditTitle } from './TodoEditTitleInput'
import { TodoEditTotalHour } from './TodoEditTotalHour'
import { EditTodoProps } from '@/types/Todo'
import {
  actualLearningTimeRules,
  descriptionRules,
  titleRules,
} from '@/validations/todos/validation'

type TodoInfo = {
  subject: string
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  studyType: string
  scheduledStudyTime: string
  actualLearningTime: string
  setScheduledStudyTime: Dispatch<React.SetStateAction<string>>
  setActualLearningTime: Dispatch<React.SetStateAction<string>>
  setTotalHour: Dispatch<SetStateAction<number>>
  handleChangeHours: (event: string) => void
  totalHour: number
  progress: string
  dueDate: string
  setDueDate: Dispatch<React.SetStateAction<string>>
  importance: string
  setImportance: Dispatch<React.SetStateAction<string>>
  selectedStars: number
  setSelectedStars: Dispatch<React.SetStateAction<number>>
  description: string
  setDescription: Dispatch<React.SetStateAction<string>>
  errors: FieldErrors<EditTodoProps>
}

export const TodoInfoEdit = ({
  subject,
  title,
  setTitle,
  studyType,
  scheduledStudyTime,
  actualLearningTime,
  setScheduledStudyTime,
  setActualLearningTime,
  setTotalHour,
  handleChangeHours,
  totalHour,
  progress,
  dueDate,
  setDueDate,
  importance,
  setImportance,
  selectedStars,
  setSelectedStars,
  description,
  setDescription,
  errors,
}: TodoInfo) => {
  return (
    <table className="w-full">
      <tbody>
        <TodoEditSubject theme="科目" props={subject} />
        <TodoEditTitle
          theme="タイトル"
          title={title}
          setTitle={setTitle}
          registerTitle={'study_hours.title'}
          rules={titleRules}
          error={errors?.study_hours?.title}
        />
        <TodoEditStudyType theme="学習タイプ" props={studyType} />
        <TodoEditScheduledStudyTime
          theme="予定学習時間"
          props={scheduledStudyTime}
        />
        <TodoEditActualLearningTime
          theme="実学習時間"
          actualLearningTime={actualLearningTime}
          registerActualLearningTime={'study_hours.actual_learning_time'}
          setScheduledStudyTime={setScheduledStudyTime}
          setActualLearningTime={setActualLearningTime}
          setTotalHour={setTotalHour}
          handleChangeHours={handleChangeHours}
          rules={actualLearningTimeRules}
          error={errors.study_hours?.actual_learning_time}
        />
        <TodoEditTotalHour theme="総学習時間" props={totalHour} />
        <TodoEditProgress theme="状態" props={progress} />
        <TodoEditDueDate
          theme="期限"
          props={dueDate}
          setDueDate={setDueDate}
          registerDueDate={'due_date'}
          error={errors.due_date}
        />
        <TodoEditImportance
          theme="重要度"
          props={importance}
          registerImportance={'importance'}
          setImportance={setImportance}
        />
        <TodoEditStarValues
          theme="星評価"
          props={selectedStars}
          setSelectedStars={setSelectedStars}
        />
        <TodoEditDescription
          theme="本文(感想)"
          props={description}
          registerDescription={'description'}
          setDescription={setDescription}
          rules={descriptionRules}
          error={errors.description}
        />
      </tbody>
    </table>
  )
}
