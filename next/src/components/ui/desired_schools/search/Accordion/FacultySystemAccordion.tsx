import { useState } from 'react'
import { FacultyAccordion } from '@/components/ui/desired_schools/search/Accordion/FacultyAccordion'
import { DepartmentArr } from '@/const/departmentArr'
import { FacultySystem } from '@/const/facultySystem'

export const FacultySystemAccordion = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <div className="w-full">
      <div
        onClick={() => {
          console.log('isActiveが作動しました')
          setIsActive(!isActive)
        }}
        className="flex border bg-slate-100 text-xl"
      >
        <span className="w-full">学部系統</span>
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
        <div className="flex w-full items-center justify-center">
          <div className="my-5 w-full">
            <div className="flex w-full items-center justify-center ">
              <ul>
                <li>
                  私立大の教育学部系については [文・人文]系統の[教育]
                  を選択してください
                </li>
              </ul>
            </div>
            <div className="mx-auto w-5/6">
              <button className="items-start justify-center ">
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
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
