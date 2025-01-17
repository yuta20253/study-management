import { useState } from 'react'
import { DeviationValueRangeSlider } from '../../../Slider/DeviationValueSlider'
import { DeviationValue } from '@/types/DesiredSchool'

export const DeviationValueAccordion = ({
  deviationValues,
}: DeviationValue) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <div className="w-full">
      {/* Accordion Header */}
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex cursor-pointer items-center justify-between border bg-slate-100 px-4 py-3 text-xl sm:px-6 sm:py-4"
      >
        <span className="w-full">入試難易度</span>
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

      {/* Accordion Body */}
      {isActive && (
        <div className="mx-auto my-5 w-full sm:w-5/6">
          <div className="w-full">
            {/* Clear button */}
            <button className="mb-4 rounded bg-red-500 px-4 py-2 text-sm text-white sm:text-base">
              <b>条件をクリア</b>
            </button>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <colgroup>
                  <col className="w-1/3" />
                  <col className="w-2/3" />
                </colgroup>
                <tbody className="border border-gray-500">
                  {/* 2nd Exam Row */}
                  <tr>
                    <th className="bg-sky-500 p-4 text-sm text-white sm:text-base">
                      <span>2次試験・個別学力検査</span>
                      <br />
                      <span>ボーダー偏差値帯</span>
                    </th>
                    <td className="p-4">
                      <div className="flex justify-center gap-4 sm:gap-6 md:gap-10">
                        <div className="mx-4">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <div>{deviationValues && deviationValues[0]}</div>
                            <div>{deviationValues && deviationValues[1]}</div>
                          </div>
                          <DeviationValueRangeSlider />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
