import { NextPage } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoadingScreen } from '@/components/Loading'
import LinkButton from '@/components/page/Common/LinkButton'
import { UserDesiredSchoolTable } from '@/components/page/desired_schools/Table/UserDesiredSchoolTable'
import { DataState } from '@/hooks/desired_schools/DataState'
import { onSubmitHandler } from '@/hooks/desired_schools/handleOnSubmit'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { DesiredSchoolProps } from '@/types/DesiredSchool'
import { DesiredSchoolDeleteContext } from '@/types/DesiredSchool/Context/desired_school_context'

const DesiredSchools: NextPage = () => {
  useRequireSignedIn()
  const {
    jsonUniversity,
    universities,
    setUniversities,
    deleteId,
    setDeleteId,
    isDelete,
    setIsDelete,
    router,
    isValid,
    handleChangeInputValue,
    error,
    setError,
  } = DataState()
  //const [error, setError] = useState<string | undefined>(undefined)
  const { register, handleSubmit } = useForm<DesiredSchoolProps>()

  const onSubmit: SubmitHandler<DesiredSchoolProps> = (data) => {
    onSubmitHandler(data, jsonUniversity, router, setError)
  }

  if (!universities) {
    return <LoadingScreen />
  }

  return (
    <div className="w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="mt-5 items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-xl font-semibold">大学名から探す :</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-2 sm:flex-row"
          >
            <input
              className="w-full rounded-lg border p-2 sm:w-80"
              placeholder="大学名を入力"
              {...register('university', { required: true })}
              onBlur={(e) => handleChangeInputValue(e)}
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-sky-500 px-4 py-2 text-white sm:mt-0 sm:w-auto"
            >
              検索
            </button>
          </form>
          {error !== null && <p className="mt-2 text-red-500">{error}</p>}

          {!isValid && (
            <p className="mt-2 text-red-500">
              入力はひらがな、カタカナ、漢字のみにしてください。
            </p>
          )}
        </div>

        <div className="mt-5">
          <DesiredSchoolDeleteContext.Provider
            value={{
              universities,
              setUniversities,
              deleteId,
              setDeleteId,
              isDelete,
              setIsDelete,
            }}
          >
            <UserDesiredSchoolTable universities={universities} />
          </DesiredSchoolDeleteContext.Provider>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-center gap-4 sm:flex-row">
        <LinkButton href={'/current/desired_schools/new'} text={'新規追加'} />
        <LinkButton href={'/current/home'} text={'ホームへ'} />
        <LinkButton
          href={'/current/desired_schools/search'}
          text={'検索ページへ移動'}
        />
      </div>
    </div>
  )
}

export default DesiredSchools
