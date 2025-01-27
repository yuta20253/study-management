import React, { useState } from 'react'
import { FacultyAccordion } from '@/components/page/desired_schools/Search/search/Accordion/FacultyAccordion'
import { DepartmentArr } from '@/const/departmentArr'
import { FacultySystem } from '@/const/facultySystem'
import { FacultySystemAccordionProps } from '@/types/DesiredSchool/Accordion/Accordion'

export const FacultySystemAccordion: React.FC<FacultySystemAccordionProps> = ({
  handleClearFacultySystem,
}: FacultySystemAccordionProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div className="w-full">
      <div
        onClick={() => {
          setIsActive(!isActive)
        }}
        className="flex cursor-pointer items-center justify-between border bg-slate-100 px-4 py-3 text-xl sm:px-6 sm:py-4"
      >
        <span className="w-full">学部系統</span>
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
              className="mx-auto mb-4 w-full rounded-md bg-blue-500 p-2 text-center text-white sm:w-auto"
              type="button"
              onClick={handleClearFacultySystem}
            >
              <b>条件をクリア</b>
            </button>
          </div>

          {FacultySystem.map((elem: string, index: number) => (
            <FacultyAccordion
              facultySystem={elem}
              departmentArr={DepartmentArr[index]}
              key={index}
              keyNum={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
