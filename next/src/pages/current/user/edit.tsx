import { NextPage } from 'next'
import Link from 'next/link'
import {
  useForm,
  SubmitHandler,
  FormProvider,
  SubmitErrorHandler,
} from 'react-hook-form'
import { LoadingScreen } from '@/components/Loading'
import { UserEditTitle } from '@/components/page/user/Form/UserEditTitle'
import { UserInfoEdit } from '@/components/page/user/Form/UserInfoEdit'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { DataState } from '@/hooks/user/Edit/DataState'
import { onSubmitHandler } from '@/hooks/user/Edit/handleOnSubmit'
import { EditUserProps } from '@/types/User'

const EditUser: NextPage = () => {
  useRequireSignedIn()
  const { user, setUser, router, selected, setSelected, age } = DataState()
  const methods = useForm<EditUserProps>({
    defaultValues: user,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const handleOnSubmit: SubmitHandler<EditUserProps> = (data) => {
    onSubmitHandler(user, setUser, router, data)
  }

  const handleOnError: SubmitErrorHandler<EditUserProps> = (errors) => {
    console.log('error', errors)
  }

  if (!user || !age) {
    return <LoadingScreen />
  }

  return (
    <div className="w-full">
      <div className="mt-3 flex w-full items-center justify-center">
        <div className="w-full px-4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="items-center justify-center">
            <div>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
                  <UserEditTitle />
                  <UserInfoEdit
                    family_name_kana={user.family_name_kana}
                    given_name_kana={user.given_name_kana}
                    family_name={user.family_name}
                    given_name={user.given_name}
                    birthday={user.birthday}
                    gender={user.gender}
                    selected={selected}
                    setSelected={setSelected}
                    postal_code={user.address.postal_code}
                    prefecture={user.address.prefecture}
                    city={user.address.city}
                    address1={user.address.address1}
                    address2={user.address.address2}
                    phone_number={user.telephone.phone_number}
                    landline_phone_number={user.telephone.landline_phone_number}
                    errors={errors}
                  />
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                      type="submit"
                      className="h-8 w-full rounded bg-sky-500 px-2 py-1 text-white sm:w-auto"
                    >
                      変更
                    </button>
                    <button className="h-8 w-full rounded bg-sky-500 px-2 py-1 sm:w-auto">
                      <Link href="/current/user">
                        <p className="text-white">キャンセル</p>
                      </Link>
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
