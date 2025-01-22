import { useState } from 'react'
import { InstallationCategoryProps } from '@/types/DesiredSchool/Accordion/Accordion'

export const InstallationCategory: React.FC<InstallationCategoryProps> = ({
  nationalSchool,
  privateSchool,
  handleChange,
  handleClearInstallationCategory,
  checkedItems, // checkedItemsもpropsとして受け取る
}: InstallationCategoryProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div className="w-full">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex cursor-pointer items-center justify-between border bg-slate-100 px-4 py-3 text-xl sm:px-6 sm:py-4"
      >
        <span className="w-full">設置区分</span>
        <span className="flex size-8 items-center justify-center">
          {isActive ? (
            <svg
              data-accordion-icon
              className="shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          ) : (
            <svg
              data-accordion-icon
              className="shrink-0 rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          )}
        </span>
      </div>

      {isActive && (
        <div className="p-4 sm:p-6">
          <div className="my-5 flex justify-center">
            <ul className="list-disc pl-5 text-sm sm:text-base">
              <li>
                私立大の教育学部系については
                [文・人文]系統の[教育]を選択してください
              </li>
            </ul>
          </div>

          <div className="mx-auto w-5/6">
            <button
              type="button"
              className="mx-auto mb-4 w-full rounded-md bg-blue-500 p-2 text-center text-white sm:w-auto"
              onClick={handleClearInstallationCategory}
            >
              <b>条件をクリア</b>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col />
                <col />
              </colgroup>
              <tbody className="border border-gray-500">
                <tr>
                  <th className="w-60 bg-sky-500 px-4 py-3 text-sm text-white sm:text-base">
                    区分
                  </th>
                  <td>
                    <div className="mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                      <div className="mx-4">
                        <label className="flex items-center text-sm sm:text-base">
                          <input
                            name="国立"
                            type="checkbox"
                            value="国立"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes('国立')}
                            className="mr-2"
                          />
                          <span></span>
                          <b>{nationalSchool}</b>
                        </label>
                      </div>
                      <div className="mx-4">
                        <label className="flex items-center text-sm sm:text-base">
                          <input
                            name="私立"
                            type="checkbox"
                            value="私立"
                            onChange={(e) => handleChange(e)}
                            checked={checkedItems.includes('私立')}
                            className="mr-2"
                          />
                          <span></span>
                          <b>{privateSchool}</b>
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
