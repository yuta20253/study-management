import { useState } from 'react'
import { InstallationCategoryProps } from '@/types/DesiredSchool/Accordion/Accordion'

export const InstallationCategory: React.FC<InstallationCategoryProps> = ({
  nationalSchool,
  privateSchool,
  handleChange,
}: InstallationCategoryProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div className="w-full">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex items-center justify-between border bg-slate-100 text-xl px-4 py-3 sm:px-6 sm:py-4 cursor-pointer"
      >
        <span className="w-full">設置区分</span>
        <span className="flex items-center justify-center w-8 h-8">
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
          <div className="flex justify-center my-5">
            <ul className="list-disc pl-5 text-sm sm:text-base">
              <li>
                私立大の教育学部系については [文・人文]系統の[教育]を選択してください
              </li>
            </ul>
          </div>

          <div className="mx-auto w-5/6">
            <button className="w-full sm:w-auto mx-auto mb-4 p-2 bg-blue-500 text-white rounded-md text-center">
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
                  <th className="w-60 bg-sky-500 text-white py-3 px-4 text-sm sm:text-base">
                    区分
                  </th>
                  <td>
                    <div className="mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                      <div className="mx-4">
                        <label className="flex items-center text-sm sm:text-base">
                          <input
                            name="国立"
                            type="checkbox"
                            onChange={(e) => handleChange(e)}
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
                            onChange={(e) => handleChange(e)}
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
