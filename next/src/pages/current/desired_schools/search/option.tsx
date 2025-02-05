import { NextPage } from 'next'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { DeviationValueAccordion } from '@/components/page/desired_schools/Search/search/Accordion/DeviationValueAccordion'
import { EntranceExaminationSubjectAndScoreAccordionySystemAccordion } from '@/components/page/desired_schools/Search/search/Accordion/EntranceExaminationSubjectAndScoreAccordion'
import { FacultySystemAccordion } from '@/components/page/desired_schools/Search/search/Accordion/FacultySystemAccordion'
import { InstallationCategory } from '@/components/page/desired_schools/Search/search/Accordion/InstallationCategoryAccordion'
import { onSubmitHandler } from '@/hooks/desired_schools/Search/Option/handleOnSubmit'
import { useDataState } from '@/hooks/desired_schools/Search/Option/useDataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import {
  CheckBoxContext,
  SliderContext,
} from '@/types/DesiredSchool/Context/option_context'

const OptionPage: NextPage = () => {
  useRequireSignedIn()
  const {
    checkedItems,
    setCheckedItems,
    deviationValues,
    setDeviationValues,
    router,
    handleChange,
    handleClearInstallationCategory,
    handleClearFacultySystem,
    handleClearCommonEntranceExaminationSunjects,
    handleClearSecondEntranceExaminationSunjects,
    deviationValuesLists,
    handleClearDeviationValues,
  } = useDataState()

  const { handleSubmit } = useForm<string[]>()
  const onSubmit: SubmitHandler<string[]> = () => {
    onSubmitHandler(checkedItems, deviationValues, deviationValuesLists, router)
  }

  return (
    <div className="w-full">
      <main className="mt-5 flex w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="w-full items-center justify-center sm:w-2/3 md:w-1/2 lg:w-2/3">
          <h1 className="h-10 bg-sky-700">
            <p className="p-1 text-center text-2xl text-white">
              各種条件から探す
            </p>
          </h1>
          <div className="h-8">
            <p className="p-1 text-center text-xs sm:text-xl">
              設置区分、学部系統で大学を検索できます。
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-slate-500 p-4">
              <div className="mb-4">
                <InstallationCategory
                  nationalSchool="国立"
                  privateSchool="私立"
                  handleChange={handleChange}
                  handleClearInstallationCategory={
                    handleClearInstallationCategory
                  }
                  checkedItems={checkedItems}
                />
              </div>
              <div className="mb-4">
                <CheckBoxContext.Provider
                  value={{
                    handleChange,
                    setCheckedItems,
                    checkedItems,
                    handleClearCommonEntranceExaminationSunjects,
                    handleClearSecondEntranceExaminationSunjects,
                  }}
                >
                  <FacultySystemAccordion
                    handleClearFacultySystem={handleClearFacultySystem}
                  />
                </CheckBoxContext.Provider>
              </div>
              <div className="mb-4">
                <CheckBoxContext.Provider
                  value={{
                    handleChange,
                    setCheckedItems,
                    checkedItems,
                    handleClearCommonEntranceExaminationSunjects,
                    handleClearSecondEntranceExaminationSunjects,
                  }}
                >
                  <EntranceExaminationSubjectAndScoreAccordionySystemAccordion />
                </CheckBoxContext.Provider>
              </div>
              <div className="mb-4">
                <SliderContext.Provider
                  value={{ deviationValues, setDeviationValues }}
                >
                  <DeviationValueAccordion
                    deviationValues={deviationValues}
                    handleClearDeviationValues={handleClearDeviationValues}
                  />
                </SliderContext.Provider>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between sm:flex-col sm:items-stretch sm:space-y-4 lg:flex-row lg:space-x-4">
                <div className="text-sm sm:text-xs">
                  ※100校以内になるように絞り込んでください。
                </div>
                <div className="flex space-x-3 sm:flex-col sm:space-x-0 sm:space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
                  <button
                    type="submit"
                    className="w-full rounded bg-sky-500 px-4 py-2 text-white sm:w-auto"
                  >
                    この条件で検索表示
                  </button>
                  <button className="w-full rounded bg-sky-500 px-4 py-2 text-white sm:w-auto">
                    <Link href="/current/desired_schools">大学一覧へ</Link>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default OptionPage
