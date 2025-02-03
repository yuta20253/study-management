import { SubmitHandler, useForm } from 'react-hook-form'
import { onSubmitHandler } from './handleOnSubmmit'
import { TodoProps } from '@/types/Todo/createNewTodo/newTodo'

export const useHandleSubmit = (dueDate: string) => {
  const methods = useForm<TodoProps>({
    defaultValues: {
      subject: '',
      title: '',
      description: '',
      progress: 'incomplete',
      study_type: 'preparation',
      scheduled_study_time: 0,
      actual_learning_time: 0,
      due_date: new Date(),
      importance: 0,
      star_rating: 1,
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit: SubmitHandler<TodoProps> = (data) => {
    onSubmitHandler(data, dueDate)
  }

  return {
    handleSubmit,
    register,
    onSubmit,
  }
}
