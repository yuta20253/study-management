import { useContext, useState } from 'react'
import { FacultyAccordionProps } from '@/types/DesiredSchool/Accordion/Accordion'
import { CheckBoxContext } from '@/types/DesiredSchool/Context/option'

export const FacultyAccordion: React.FC<FacultyAccordionProps> = ({
  facultySystem,
  departmentArr,
  keyNum,
}: FacultyAccordionProps) => {
  const [openFacultySystem, setOpenFacultySystem] = useState(false)

  const { handleChange } = useContext(CheckBoxContext)

  return (
    <div key={keyNum} className="mx-auto w-full sm:w-5/6">
      <div
        onClick={() => setOpenFacultySystem(!openFacultySystem)}
        className="flex items-center justify-between border bg-slate-100 text-xl px-4 py-3 sm:px-6 sm:py-4 cursor-pointer"
      >
        <span className="w-full">{facultySystem}</span>
        <span className="flex items-center justify-center w-8 h-8">
          {openFacultySystem ? (
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

      {openFacultySystem && (
        <div className="p-4 sm:p-6">
          <div className="w-full">
            <label className="flex items-center space-x-2 mb-4">
              <input name="select-all" type="checkbox" className="form-checkbox" />
              <span className="text-lg">
                <b>すべて選択</b>
              </span>
            </label>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {departmentArr.map((department: string, i: number) => (
                <div key={i}>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        name={`${department}`}
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="text-sm sm:text-base">{department}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
