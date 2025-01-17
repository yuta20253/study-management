type HandleProps = {
  handleChangeStatusAll: () => void
  handleChangeStatusIncomplete: () => void
  handleChangeStatusOnTheWay: () => void
  handleChangeStatusComplete: () => void
}

export const SelectTodoStatus = ({
  handleChangeStatusAll,
  handleChangeStatusIncomplete,
  handleChangeStatusOnTheWay,
  handleChangeStatusComplete,
}: HandleProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-7">
      <button
        className="w-full sm:w-auto rounded bg-sky-500 px-3 py-1 text-white mb-2 sm:mb-0"
        onClick={handleChangeStatusAll}
      >
        全て
      </button>
      <button
        className="w-full sm:w-auto rounded bg-sky-500 px-3 py-1 text-white mb-2 sm:mb-0"
        onClick={handleChangeStatusIncomplete}
      >
        未完了
      </button>
      <button
        className="w-full sm:w-auto rounded bg-sky-500 px-3 py-1 text-white mb-2 sm:mb-0"
        onClick={handleChangeStatusOnTheWay}
      >
        途中
      </button>
      <button
        className="w-full sm:w-auto rounded bg-sky-500 px-3 py-1 text-white mb-2 sm:mb-0"
        onClick={handleChangeStatusComplete}
      >
        完了
      </button>
    </div>
  )
}
