import { Dispatch, SetStateAction, useState } from 'react'

type RegionProps = {
  region: string
  prefectures: string[]
  checkedItems: string
  setCheckedItems: Dispatch<SetStateAction<string>>
}

export const RegionSystemAccordion: React.FC<RegionProps> = ({
  region,
  prefectures,
  checkedItems,
  setCheckedItems,
}: RegionProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div className="w-full">
      {/* Accordion Header */}
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex items-center justify-between border bg-sky-200 text-xl px-4 py-3 sm:px-6 sm:py-4 cursor-pointer"
      >
        <span className="w-full text-sky-600">{region}</span>
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

      {/* Accordion Body */}
      {isActive && (
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          {prefectures.map((prefecture: string, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between border-b text-xl text-sky-600 odd:bg-sky-100 py-2"
            >
              <button
                onClick={() => setCheckedItems(prefecture)}
                className="w-full text-left text-blue-500 hover:text-blue-700"
              >
                {prefecture}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
