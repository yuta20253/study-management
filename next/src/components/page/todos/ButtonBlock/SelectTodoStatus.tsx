import { HandleProps } from '@/types/Todo/Button/button'

export const SelectTodoStatus = ({
  handleChangeStatusAll,
  handleChangeStatusIncomplete,
  handleChangeStatusOnTheWay,
  handleChangeStatusComplete,
}: HandleProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-7">
      <button
        className="mb-2 w-full rounded bg-sky-500 px-3 py-1 text-white sm:mb-0 sm:w-auto"
        onClick={handleChangeStatusAll}
      >
        全て
      </button>
      <button
        className="mb-2 w-full rounded bg-sky-500 px-3 py-1 text-white sm:mb-0 sm:w-auto"
        onClick={handleChangeStatusIncomplete}
      >
        未完了
      </button>
      <button
        className="mb-2 w-full rounded bg-sky-500 px-3 py-1 text-white sm:mb-0 sm:w-auto"
        onClick={handleChangeStatusOnTheWay}
      >
        途中
      </button>
      <button
        className="mb-2 w-full rounded bg-sky-500 px-3 py-1 text-white sm:mb-0 sm:w-auto"
        onClick={handleChangeStatusComplete}
      >
        完了
      </button>
    </div>
  )
}
