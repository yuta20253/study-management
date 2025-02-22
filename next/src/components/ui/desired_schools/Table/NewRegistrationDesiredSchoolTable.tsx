import { NewRegistrationDesiredSchoolTableProps } from '@/types/DesiredSchool/Table/DesiredSchoolTable'

export const NewRegistrationDesiredSchoolTable: React.FC<
  NewRegistrationDesiredSchoolTableProps
> = ({
  input,
  handleChangeInputValue,
}: NewRegistrationDesiredSchoolTableProps) => {
  return (
    <table className="h-12 w-full items-center justify-center border border-slate-500">
      <thead>
        <tr>
          <th className="h-12 w-full items-center justify-center bg-sky-700">
            <span className="items-center text-center text-white">
              志望校新規登録
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="flex w-full">
          <th className="w-1/2 items-center justify-center">
            <span className="items-center justify-center">大学名:</span>
          </th>
          <td className="w-1/2 items-center justify-center">
            {/* 入力フィールド */}
            <input
              type="text"
              defaultValue={input}
              className="w-3/4"
              //onChange={(e) => handleChangeInputValue(e)}
              onChange={(e) => handleChangeInputValue(e)}
            />
            <span className="items-center justify-center">大学</span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
