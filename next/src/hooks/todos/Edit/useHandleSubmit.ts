import { NextRouter } from 'next/router'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { onSubmitHandler } from './handleOnSubmit'
import { EditTodoProps } from '@/types/Todo'

export const useHandleSubmit = (
  id: string | string[] | undefined,
  title: string,
  scheduledStudyTime: string,
  subject: string,
  progress: string,
  importance: string,
  actualLearningTime: string,
  totalHour: number,
  studyType: string,
  selectedStars: number,
  dueDate: string,
  description: string,
  todo: EditTodoProps | undefined,
  router: NextRouter,
) => {
  const methods = useForm<EditTodoProps>({
    defaultValues: todo,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<EditTodoProps> = (data) => {
    onSubmitHandler(
      id,
      todo,
      title,
      scheduledStudyTime,
      progress,
      importance,
      studyType,
      totalHour,
      selectedStars,
      dueDate,
      description,
      subject,
      actualLearningTime,
      router,
      data,
    )
  }

  const handleOnError: SubmitErrorHandler<EditTodoProps> = (errors) => {
    console.log('error', errors)
  }

  return {
    methods,
    handleSubmit,
    onSubmit,
    handleOnError,
    errors,
  }
}
