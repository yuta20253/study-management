import type { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import { TodoDetailTable } from '@/components/page/todos/Table/TodoDetailTable'
import { useDataState } from '@/hooks/todos/Show/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const TodoDetail: NextPage = () => {
  useRequireSignedIn()
  const { todo, error } = useDataState()

  if (!todo) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <ErrorTemplate error={error} href="/current/todos" text={'Todo一覧へ'} />
    )
  }

  return (
    <div className="flex w-full items-center justify-center px-4 sm:px-8">
      <div className="w-full items-center justify-center sm:w-2/3 md:w-1/2 lg:w-1/3">
        <TodoDetailTable todo={todo} />
      </div>
    </div>
  )
}

export default TodoDetail
