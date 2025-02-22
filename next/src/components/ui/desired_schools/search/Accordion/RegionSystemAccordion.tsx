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
  console.log(checkedItems)
  return (
    <div className="w-full">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex border bg-sky-200 text-xl"
      >
        <span className="w-full text-sky-600">{region}</span>
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
        <div className="mx-auto ">
          {prefectures.map((prefecture: string, i: number) => (
            <div
              key={i}
              className="flex border text-xl text-sky-600 odd:bg-sky-100"
            >
              <button onClick={() => setCheckedItems(prefecture)}>
                <span className="text-blue-400">{prefecture}</span>
              </button>
            </div>
          ))}
        </div>
      ) : undefined}
    </div>
  )
}
