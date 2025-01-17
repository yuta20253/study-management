import Link from 'next/link'
import { memo, useState } from 'react'
import { UseDeleteTodoButton } from '@/components/page/todos/Button/deleteTodoButton'
import { UseHandleClickTodo } from '@/components/page/todos/Button/useShowTodoDetailButton'
import { TodoProps, Todos } from '@/types/Todo'

export const TodoList = memo(function TodoList({ todos, status }: Todos) {
  const [isDelete, setIsDelete] = useState<boolean>(false)

  return (
    <>
      {todos &&
        todos
          .filter((todo: TodoProps) => {
            if (status === '') {
              return todo.progress !== status
            } else {
              return todo.progress === status
            }
          })
          .map((todo: TodoProps, i: number) => (
            <tr
              key={i}
              className="mb-4 flex flex-col border-b border-gray-200 sm:mb-2 sm:flex-row"
            >
              <td className="w-full p-2 text-center sm:w-1/2 sm:text-left">
                <p className="text-center text-lg font-semibold sm:text-2xl">
                  <UseHandleClickTodo todo={todo} />
                </p>
              </td>
              <td className="w-full p-2 text-center sm:w-1/6 sm:text-left">
                <p className="text-center text-base sm:text-xl">
                  {todo.subject}
                </p>
              </td>
              <td className="w-full p-2 text-center sm:w-1/6 sm:text-left">
                <p className="text-center text-base sm:text-xl">
                  {todo.progress}
                </p>
              </td>
              <td className="w-full p-2 text-center sm:w-1/12">
                <div className="mx-auto w-1/3 sm:w-full">
                  <Link href={`/current/todos/${todo.id}`}>
                    <button className="w-full rounded bg-sky-500 px-2 py-1 text-base text-white sm:w-auto sm:text-xl">
                      詳細
                    </button>
                  </Link>
                </div>
              </td>
              <td className="w-full p-2 text-center sm:w-1/12">
                <div className="mx-auto w-1/3 sm:w-full">
                  <UseDeleteTodoButton
                    id={todo.id}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                  />
                </div>
              </td>
            </tr>
          ))}
    </>
  )
})
