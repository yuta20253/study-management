import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useUserState } from '@/hooks/useGlobalState'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('uid', res.headers['uid'])
        localStorage.setItem('client', res.headers['client'])
        setUser({
          ...user,
          isFetched: false,
        })
        router.push('/current/home')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full rounded-lg bg-white p-6 shadow-lg sm:w-96 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">サインイン</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    メールアドレス:
                  </label>
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="〇〇@xxx.com"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-6">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    パスワード:
                  </label>
                  <input
                    {...field}
                    type="password"
                    id="password"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="***********"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-full rounded bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
              type="submit"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
