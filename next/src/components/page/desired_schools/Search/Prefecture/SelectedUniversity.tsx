import Link from 'next/link'
import { UniversityPrefecture } from '@/types/DesiredSchool'

type SelectUniversityListProps = {
  checkedItems: string
  universities: UniversityPrefecture[]
}
export const SelectUniversityList = ({
  checkedItems,
  universities,
}: SelectUniversityListProps) => {
  return (
    <div className="mx-5 mt-10 w-3/5">
      {checkedItems && (
        <div className="border border-slate-500">
          {universities
            .filter((university: UniversityPrefecture) => {
              console.log(
                `university:::::${university.prefecture}:::::checkedItems:::::${checkedItems}`,
              )
              return university.prefecture === checkedItems
            })
            .map((university: UniversityPrefecture, i: number) => (
              <div key={i} className="border-y odd:bg-sky-100">
                <div className="flex h-8">
                  <div className="m-1 w-1/4 items-center justify-center">
                    {university.division === '国立' ? (
                      <span className="m-1 bg-sky-600 p-1 text-white">
                        {university.division}
                      </span>
                    ) : (
                      <span className="m-1 bg-red-400 p-1 text-white">
                        {university.division}
                      </span>
                    )}
                  </div>
                  <div className="m-1 w-3/4 items-center justify-center">
                    <Link href={`/current/schools/${university.code}`}>
                      <span className="m-1 p-1 text-sky-500">
                        {university.school}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
