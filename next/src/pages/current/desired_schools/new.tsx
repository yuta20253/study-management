import { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import { CreateNewDesiredSchoolModal } from '@/components/page/desired_schools/Modal/createNewDesiredSchool'
import { NewRegistrationDesiredSchoolTable } from '@/components/page/desired_schools/Table/NewRegistrationDesiredSchoolTable'
import { DataState } from '@/hooks/desired_schools/New/DataState'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const NewDesiredSchool: NextPage = () => {
  useRequireSignedIn()
  const {
    jsonUniversity,
    input,
    isOpen,
    onOpen,
    onClose,
    isValid,
    handleChangeInputValue,
  } = DataState()

  if (!jsonUniversity) {
    return <LoadingScreen />
  }

  return (
    <div className="relative flex w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      {isOpen && (
        <CreateNewDesiredSchoolModal
          universityName={input}
          jsonUniversity={jsonUniversity}
          onClose={onClose}
        />
      )}
      <div className="mt-5 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <NewRegistrationDesiredSchoolTable
          input={input}
          handleChangeInputValue={handleChangeInputValue}
        />
        {!isValid && input !== '' && (
          <p className="mt-2 text-xs text-red-500 sm:text-sm">
            入力はひらがな、カタカナ、漢字のみにしてください。
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-lg bg-sky-500 px-4 py-2 text-xs text-white sm:text-sm"
          >
            検索
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewDesiredSchool
