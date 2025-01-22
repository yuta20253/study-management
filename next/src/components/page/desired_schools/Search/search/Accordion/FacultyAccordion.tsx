import { useContext, useEffect, useState } from 'react'
import { FacultyAccordionProps } from '@/types/DesiredSchool/Accordion/Accordion'
import { CheckBoxContext } from '@/types/DesiredSchool/Context/option'

export const FacultyAccordion: React.FC<FacultyAccordionProps> = ({
  facultySystem,
  departmentArr,
  keyNum,
}: FacultyAccordionProps) => {
  const [openFacultySystem, setOpenFacultySystem] = useState(false)

  const { handleChange, checkedItems, setCheckedItems } = useContext(CheckBoxContext)
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  useEffect(() => {
    if (selectAllChecked) {
      setCheckedItems(departmentArr)
    } else {
      setCheckedItems((prev) =>  prev.filter((item) => !departmentArr.includes(item)))
    }
  },[selectAllChecked, departmentArr, setCheckedItems])

  const handleClickAllSelectButton = () => {
    setSelectAllChecked(!selectAllChecked)
  }

  return (
    <div key={keyNum} className="mx-auto w-full sm:w-5/6">
      <div
        onClick={() => setOpenFacultySystem(!openFacultySystem)}
        className="flex cursor-pointer items-center justify-between border bg-slate-100 px-4 py-3 text-xl sm:px-6 sm:py-4"
      >
        <span className="w-full">{facultySystem}</span>
        <span className="flex size-8 items-center justify-center">
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
            <label className="mb-4 flex items-center space-x-2">
              <input name="select-all" type="checkbox" onChange={handleClickAllSelectButton}/>
              <span className="text-lg">
                <b>すべて選択</b>
              </span>
            </label>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {departmentArr.map((department: string, i: number) => (
                <div key={i}>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        name={`${department}`}
                        type="checkbox"
                        value={`${department}`}
                        onChange={(e) => handleChange(e)}
                        checked={checkedItems.includes(`${department}`)}
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

