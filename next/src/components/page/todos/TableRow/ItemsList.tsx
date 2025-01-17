export const ItemsList = () => {
  return (
    <tr className=" flex h-12">
      <th className="h-12 w-1/2 items-center justify-center bg-sky-600 ">
        <p className="my-3 text-center text-white">タイトル</p>
      </th>
      <th className="h-12 w-1/6 items-center justify-center bg-sky-600">
        <p className="my-3  text-center text-white">科目</p>
      </th>
      <th className="h-12 w-1/6 items-center justify-center bg-sky-600">
        <p className="my-3  text-center text-white">状態</p>
      </th>
      <th className="h-12 w-1/12  bg-sky-600"></th>
      <th className="h-12 w-1/12  bg-sky-600"></th>
    </tr>
  )
}
