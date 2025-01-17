import type { NextPage } from 'next'
import Link from 'next/link'
import {
  useForm,
  SubmitHandler,
  FormProvider,
  SubmitErrorHandler,
} from 'react-hook-form'
import { LoadingScreen } from '@/components/Loading'
import { TodoEditThemeTable } from '@/components/page/todos/Form/TodoEditThemeTiitle'
import { TodoInfoEdit } from '@/components/page/todos/Form/TodoInfoEdit'
import { DataState } from '@/hooks/todos/Edit/DataState'
import { onSubmitHandler } from '@/hooks/todos/Edit/handleOnSubmit'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { EditTodoProps } from '@/types/Todo'

const EditTodo: NextPage = () => {
  useRequireSignedIn()
  const {
    todo,
    router,
    id,
    title,
    setTitle,
    scheduledStudyTime,
    setScheduledStudyTime,
    subject,
    progress,
    importance,
    setImportance,
    actualLearningTime,
    setActualLearningTime,
    totalHour,
    setTotalHour,
    studyType,
    selectedStars,
    setSelectedStars,
    dueDate,
    setDueDate,
    description,
    setDescription,
    handleChangeHours,
  } = DataState()

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

  if (!todo || Object.keys(todo).length === 0) {
    return <LoadingScreen />
  }

  return (
    <div className="mt-4 flex w-full items-center justify-center sm:mt-8">
      <div className="w-full sm:w-2/3 lg:w-1/2">
        <FormProvider {...methods}>
          <form
            role="form"
            className="flex w-full flex-col items-center justify-center"
            onSubmit={handleSubmit(onSubmit, handleOnError)}
          >
            <TodoEditThemeTable />
            <TodoInfoEdit
              subject={subject}
              title={todo.title}
              setTitle={setTitle}
              studyType={studyType}
              scheduledStudyTime={scheduledStudyTime}
              actualLearningTime={actualLearningTime}
              setScheduledStudyTime={setScheduledStudyTime}
              setActualLearningTime={setActualLearningTime}
              setTotalHour={setTotalHour}
              handleChangeHours={handleChangeHours}
              totalHour={totalHour}
              progress={progress}
              dueDate={dueDate}
              setDueDate={setDueDate}
              importance={importance}
              setImportance={setImportance}
              selectedStars={selectedStars}
              setSelectedStars={setSelectedStars}
              description={description}
              setDescription={setDescription}
              errors={errors}
            />
            <div className="flex items-center justify-center gap-10">
              <div className="h-8  rounded bg-sky-500">
                <button type="submit">
                  <p className="mx-2 my-1 text-center text-white">更新</p>
                </button>
              </div>
              <div className="h-8 rounded bg-sky-500">
                <button>
                  <Link href={`/current/todos/${id}`}>
                    <p className="m-1 text-center text-white">キャンセル</p>
                  </Link>
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EditTodo
