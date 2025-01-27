import { NewRegistrationDesiredSchoolTableProps } from '@/types/DesiredSchool/Table/table'

export const NewRegistrationDesiredSchoolTable: React.FC<
  NewRegistrationDesiredSchoolTableProps
> = ({
  input,
  handleChangeInputValue,
}: NewRegistrationDesiredSchoolTableProps) => {
  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
      <table className="w-full border border-slate-500">
        <thead>
          <tr>
            <th className="h-12 bg-sky-700 text-center text-white">
              <span className="text-lg font-semibold">志望校新規登録</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col sm:flex-row">
            <th className="flex w-full items-center justify-center px-4 py-2 sm:w-1/3">
              <span className="text-base sm:text-lg">大学名:</span>
            </th>
            <td className="flex w-full items-center justify-center px-4 py-2 sm:w-2/3">
              {/* 入力フィールド */}
              <input
                type="text"
                defaultValue={input}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChangeInputValue(e)}
              />
              <span className="ml-2 text-base sm:text-lg">大学</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
