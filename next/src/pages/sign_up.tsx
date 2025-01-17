import axios, { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type SignUpFormData = {
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  birthday: Date
  gender: string
  email: string
  password: string
  address_attributes: {
    prefecture: string
    city: string
    address1: string
    address2?: string
    postal_code: string
    user_id: number
  }
  telephone_attributes: {
    phone_number: string
    landline_phone_number: string
    user_id: number
  }
}

const SignUp: NextPage = () => {
  const router = useRouter()
  const [, setIsLoading] = useState<boolean>(false)
  const [selectedGender, setSelectedGender] = useState<string>('')
  const changeGender = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value)
    console.log('性別が変わりました')
    console.log(selectedGender)
  }

  const { handleSubmit, register } = useForm<SignUpFormData>({
    defaultValues: {
      family_name: '',
      given_name: '',
      family_name_kana: '',
      given_name_kana: '',
      birthday: new Date(),
      gender: '男',
      email: '',
      password: '',
      address_attributes: {
        prefecture: '',
        city: '',
        address1: '',
        address2: '',
        postal_code: '',
      },
      telephone_attributes: {
        phone_number: '',
        landline_phone_number: '',
      },
    },
  })

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      setIsLoading(true)
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
      const headers = {
        'Content-Type': 'application/json',
      }
      const confirmSuccessUrl =
        process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/sign_in'

      const postData = {
        ...data,
      }
      await axios({
        method: 'POST',
        url: url,
        headers: headers,
        data: { ...postData, confirm_success_url: confirmSuccessUrl },
      })
        .then((res: AxiosResponse) => {
          localStorage.setItem(
            'access-token',
            res.headers['access-token'] || '',
          )
          localStorage.setItem('client', res.headers['client'] || '')
          localStorage.setItem('uid', res.headers['uid'] || '')
          router.push('/sign_in')
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
        })
      setIsLoading(false)
    }
    SignUp(data)
  }

  return (
    <div className="w-full">
      <div className="flex w-screen items-center justify-center p-4 sm:p-6">
        <div className="w-full rounded-lg bg-white shadow-lg sm:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full">
              <tbody>
                <tr>
                  <th className="h-12 w-full bg-sky-700">
                    <p className="flex h-12 items-center justify-center text-center text-2xl text-white">
                      個人情報入力
                    </p>
                  </th>
                </tr>
              </tbody>
            </table>

            <table className="w-full border border-slate-500">
              <tbody>
                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    氏名カナ
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="姓(カナ)"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('family_name_kana', { required: true })}
                    />
                    <input
                      type="text"
                      placeholder="名(カナ)"
                      className="mt-2 w-full rounded border border-slate-300 p-2"
                      {...register('given_name_kana', { required: true })}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    氏名
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="姓"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('family_name', { required: true })}
                    />
                    <input
                      type="text"
                      placeholder="名"
                      className="mt-2 w-full rounded border border-slate-300 p-2"
                      {...register('given_name', { required: true })}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    生年月日
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="date"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('birthday', { required: true })}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    性別
                  </th>
                  <td className="border border-slate-500 p-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value="male"
                        className="mr-2"
                        {...register('gender', { required: true })}
                        onChange={changeGender}
                      />
                      <label className="mr-4">男</label>
                      <input
                        type="radio"
                        value="female"
                        className="mr-2"
                        {...register('gender', { required: true })}
                        onChange={changeGender}
                      />
                      <label>女</label>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    メールアドレス
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="email"
                      placeholder="aaaaaaaa@example.com"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('email', { required: true })}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    パスワード
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="password"
                      placeholder="パスワードを入力"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('password', { required: true })}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    郵便番号
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="郵便番号"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('address_attributes.postal_code')}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    都道府県
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="都道府県"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('address_attributes.prefecture')}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    市区町村
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="市区町村"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('address_attributes.city')}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    町域・番地
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="町域・番地"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('address_attributes.address1')}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    建物名など
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      placeholder="建物名など"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('address_attributes.address2')}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    本人携帯
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="tel"
                      placeholder="080-xxxx-xxxx"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register('telephone_attributes.phone_number')}
                    />
                  </td>
                </tr>

                <tr>
                  <th className="h-12 bg-sky-600 text-center text-xl text-white">
                    固定電話
                  </th>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="tel"
                      placeholder="03-xx-xxxx"
                      className="w-full rounded border border-slate-300 p-2"
                      {...register(
                        'telephone_attributes.landline_phone_number',
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 flex justify-center gap-4">
              <button
                type="submit"
                className="h-10 w-full rounded bg-sky-600 px-6 py-2 text-white sm:w-auto"
              >
                登録
              </button>
              <button className="h-10 w-full rounded bg-sky-600 px-6 py-2 sm:w-auto">
                <Link href="/current/home">
                  <p className="text-white">キャンセル</p>
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
