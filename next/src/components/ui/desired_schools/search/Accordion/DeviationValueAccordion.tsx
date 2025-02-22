import { useState } from 'react'
import { DeviationValueRangeSlider } from '../../Slider/DeviationValueSlider'
import { DeviationValue } from '@/types/DesiredSchool'

export const DeviationValueAccordion = ({
  deviationValues,
}: DeviationValue) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <div className="w-full">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex border bg-slate-100 text-xl"
      >
        <span className="w-full">入試難易度</span>
        <span className="float-end flex w-8 items-center">
          {isActive ? (
            <svg
              data-accordion-icon
              className="size-3 shrink-0"
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
              className="size-3 shrink-0 rotate-180"
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
      {isActive ? (
        <div className="mx-auto w-5/6">
          <div className=" my-5 w-full">
            <div className="w-full">
              <button className="items-start justify-center">
                <b>条件をクリア</b>
              </button>
            </div>
            <div>
              <table className="w-full">
                <colgroup>
                  <col></col>
                  <col></col>
                </colgroup>
                <tbody className="border border-gray-500 ">
                  <tr>
                    <th className="w-60 bg-sky-500">
                      <span className="text-white">2次試験・個別学力検査</span>
                      <br></br>
                      <span className="text-white">ボーダー偏差値帯</span>
                    </th>
                    <td>
                      <div className="mx-auto flex items-center justify-center gap-10">
                        <div className="mx-4">
                          <div className="flex justify-between">
                            <div className="">
                              {deviationValues && deviationValues[0]}
                            </div>
                            <div className="">
                              {deviationValues && deviationValues[1]}
                            </div>
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
      ) : undefined}
    </div>
  )
}
