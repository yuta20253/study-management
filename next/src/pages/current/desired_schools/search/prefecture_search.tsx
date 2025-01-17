import { NextPage } from 'next'
import { SelectUniversityList } from '@/components/page/desired_schools/Search/Prefecture/SelectedUniversity'
import { RegionSystemAccordion } from '@/components/page/desired_schools/Search/search/Accordion/RegionSystemAccordion'
import { PrefectureArr } from '@/const/prefectureArr'
import { regions } from '@/const/regions'
import { DataState } from '@/hooks/desired_schools/Search/PrefectureSearch/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const PrefectureSearch: NextPage = () => {
  useRequireSignedIn()
  const { checkedItems, setCheckedItems, universities } = DataState()
  console.log(`checkedItems:::::${checkedItems}`)

  return (
    <div className="w-full">
      <main className="mt-5 flex w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="w-full items-center justify-center sm:w-2/3 lg:w-2/3 xl:w-2/3">
          <h1 className="h-10 bg-sky-700">
            <p className="p-1 text-center text-2xl text-white">
              都道府県から探す
            </p>
          </h1>

          <div className="mt-10 flex w-full justify-center sm:justify-start">
            {checkedItems && (
              <span className="text-2xl sm:text-xl">{`${checkedItems}の大学一覧`}</span>
            )}
          </div>

          <div className="mt-10 flex w-full flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="mb-4 w-full sm:mb-0 sm:w-1/4">
              <div className="border border-slate-500">
                {regions.map((region: string, i: number) => (
                  <div key={i}>
                    <RegionSystemAccordion
                      region={region}
                      prefectures={PrefectureArr[i]}
                      checkedItems={checkedItems}
                      setCheckedItems={setCheckedItems}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-3/4">
              <SelectUniversityList
                checkedItems={checkedItems}
                universities={universities}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PrefectureSearch
