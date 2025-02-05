import { NextPage } from 'next'
import { LoadingScreen } from '@/components/Loading'
import { ErrorTemplate } from '@/components/page/Common/ErrorTemplate'
import LinkButton from '@/components/page/Common/LinkButton'
import { UserInfoTr } from '@/components/page/user/TableRow/UserInfoTr'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { useDataState } from '@/hooks/user/useDataState'

const User: NextPage = () => {
  useRequireSignedIn()
  const { user, age, year, month, day, error } = useDataState()
  if (!user || !age) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <ErrorTemplate error={error} href={'/current/home'} text={'ホームへ'} />
    )
  }

  return (
    <div className="w-full">
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="top-5 h-3/4 w-full items-center justify-center space-y-4 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div className="flex items-center justify-center">
            <table className="w-full border-collapse border border-slate-500 ">
              <tbody>
                <tr>
                  <th className="h-12 border border-slate-600 bg-sky-700">
                    <span className="flex h-10 items-center justify-center text-center text-2xl text-white">
                      個人情報
                    </span>
                  </th>
                </tr>
                <UserInfoTr
                  title="氏名カナ"
                  data1={user.family_name_kana}
                  data2={user.given_name_kana}
                />
                <UserInfoTr
                  title="氏名"
                  data1={user.family_name}
                  data2={user.given_name}
                />
                <UserInfoTr
                  title="生年月日"
                  data1={year}
                  data2="年"
                  data3={month}
                  data4="月"
                  data5={day}
                  data6="日"
                />
                <UserInfoTr title="郵便番号" data1={user.address.postal_code} />
                <UserInfoTr
                  title="住所"
                  data1={user.address.prefecture}
                  data2={user.address.city}
                  data3={user.address.address1}
                  data4={user.address.address2}
                />
                <UserInfoTr
                  title="電話番号"
                  data1={user.telephone.phone_number}
                />
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex h-12 flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-4">
            <div className="my-1">
              <LinkButton href={'/current/user/edit'} text={'個人情報編集'} />
            </div>
            <div>
              <LinkButton href={'/current/home'} text={'ホームへ'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
