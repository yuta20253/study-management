import { NewRegistrationDesiredSchoolTableProps } from '@/types/DesiredSchool/Table/DesiredSchoolTable'

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
            <th className="h-12 bg-sky-700 text-white text-center">
              <span className="text-lg font-semibold">志望校新規登録</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col sm:flex-row w-full">
            <th className="w-full sm:w-1/3 flex items-center justify-center py-2 px-4">
              <span className="text-base sm:text-lg">大学名:</span>
            </th>
            <td className="w-full sm:w-2/3 flex items-center justify-center py-2 px-4">
              {/* 入力フィールド */}
              <input
                type="text"
                defaultValue={input}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
