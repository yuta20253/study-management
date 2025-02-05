import { Pagination } from '@mui/material'
import type { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import LinkButton from '@/components/page/Common/LinkButton'
import ModalOpenButton from '@/components/page/todos/Button/modalOpenButton'
import { SelectTodoStatus } from '@/components/page/todos/ButtonBlock/SelectTodoStatus'
import { TodoList } from '@/components/page/todos/List/TodoList'
import { CreateNewTodoModal } from '@/components/page/todos/Modal/CreateNewTodoModal'
import { ItemsList } from '@/components/page/todos/TableRow/ItemsList'
import { TodoDetail } from '@/components/page/todos/TodoDetail'
import { useDataState } from '@/hooks/todos/useDataState'

import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import {
  TodoDeleteContext,
  TodoDetailContext,
} from '@/types/Todo/Context/todo_context'

const Todos: NextPage = () => {
  useRequireSignedIn()
  const {
    todos,
    setTodos,
    todoDetail,
    setTodoDetail,
    deleteId,
    setDeleteId,
    isOpen,
    onOpen,
    onClose,
    status,
    isDelete,
    setIsDelete,
    meta,
    handleChangePage,
    handleChangeStatusAll,
    handleChangeStatusIncomplete,
    handleChangeStatusComplete,
    handleChangeStatusOnTheWay,
    error,
  } = useDataState()
  if (!todos || !meta) {
    return <LoadingScreen />
  }

  return (
    <div className="w-full">
      <div className="relative mt-14 flex w-full items-center justify-center">
        {isOpen && <CreateNewTodoModal onClose={onClose} />}
        <div className="w-full">
          {error && (
            <div className="mb-4 bg-red-500 p-4 text-white">{error}</div>
          )}
          <div className="relative items-center justify-center">
            {todoDetail !== undefined ? (
              <TodoDetail todo={todoDetail} setTodoDetail={setTodoDetail} />
            ) : (
              <></>
            )}
          </div>

          <div className="flex w-full items-center justify-center">
            <table className="my-5 w-full items-center justify-center overflow-x-auto sm:w-2/3">
              <tbody>
                <tr className="h-12">
                  <th className="w-full items-center justify-center bg-sky-700">
                    <p className="text-center text-lg text-white sm:text-xl">
                      Todo情報
                    </p>
                  </th>
                </tr>
                <ItemsList />
                <TodoDetailContext.Provider
                  value={{ todoDetail, setTodoDetail }}
                >
                  <TodoDeleteContext.Provider
                    value={{
                      todos,
                      setTodos,
                      deleteId,
                      setDeleteId,
                      isDelete,
                      setIsDelete,
                    }}
                  >
                    <TodoList todos={todos} status={status} />
                  </TodoDeleteContext.Provider>
                </TodoDetailContext.Provider>
              </tbody>
            </table>
          </div>

          <div className="mt-2 flex w-full flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
            <div>
              <ModalOpenButton onOpen={onOpen} text={'新規追加'} />
            </div>
            <div>
              <LinkButton href={'/current/home'} text={'ホームへ'} />
            </div>
            <SelectTodoStatus
              handleChangeStatusAll={handleChangeStatusAll}
              handleChangeStatusIncomplete={handleChangeStatusIncomplete}
              handleChangeStatusOnTheWay={handleChangeStatusOnTheWay}
              handleChangeStatusComplete={handleChangeStatusComplete}
            />
          </div>

          <div className="mt-2 flex w-full items-center justify-center gap-8 sm:gap-12">
            <div>
              <Pagination
                count={meta?.total_pages}
                page={meta?.current_page}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todos
