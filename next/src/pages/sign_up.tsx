import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/page/sign/Form/Input'
import { BirthdayInput } from '@/components/page/sign/Form/InputBirthday'
import { NameInput } from '@/components/page/sign/Form/InputName'
import { RadioGender } from '@/components/page/sign/Form/RadioGender'
import { Theme } from '@/components/page/sign/Form/Theme'
import { handleSignUp } from '@/hooks/sign/handleOnSubmit'
import { useSignUpForm } from '@/hooks/sign/useSignUpForm'
import { SignUpFormData } from '@/types/SignUp/SignUp'

const SignUp: NextPage = () => {
  const router = useRouter()
  const [, setIsLoading] = useState<boolean>(false)
  const [, setSelectedGender] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const today = new Date().toISOString().split('T')[0]
  const changeGender = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value)
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useSignUpForm()

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    handleSignUp(data, setIsLoading, router)
  }

  return (
    <div className="w-full">
      <div className="flex w-screen items-center justify-center p-4 sm:p-6">
        <div className="w-full rounded-lg bg-white shadow-lg sm:w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full">
              <Theme theme="個人情報入力" />
            </table>
            <table className="w-full border border-slate-500">
              <tbody>
                <NameInput
                  theme="氏名カナ"
                  placeholderFirst="姓(カナ)"
                  placeholderSecond="名(カナ)"
                  registerFirst={register('family_name_kana', {
                    required: '姓(カナ)は必須です',
                  })}
                  registerSecond={register('given_name_kana', {
                    required: '名(カナ)は必須です',
                  })}
                  errorFirst={errors.family_name_kana}
                  errorSecond={errors.given_name_kana}
                />
                <NameInput
                  theme="氏名"
                  placeholderFirst="姓"
                  placeholderSecond="名"
                  registerFirst={register('family_name', {
                    required: '姓は必須です',
                  })}
                  registerSecond={register('given_name', {
                    required: '名は必須です',
                  })}
                  errorFirst={errors.family_name}
                  errorSecond={errors.given_name}
                />
                <BirthdayInput
                  theme="生年月日"
                  register={register('birthday', {
                    required: '誕生日は必須です。',
                    validate: {
                      notAfterToday: () => {
                        if (new Date(date) > new Date(today)) {
                          return '未来日は登録できません'
                        }
                        return true
                      },
                    },
                  })}
                  error={errors.birthday}
                  setDate={setDate}
                />
                <RadioGender
                  theme="性別"
                  valueFirst="male"
                  registerFirst={register('gender')}
                  labelFirst="男"
                  valueSecond="female"
                  registerSecond={register('gender')}
                  labelSecond="女"
                  changeGender={changeGender}
                />
                <Input
                  theme="メールアドレス"
                  type="email"
                  placeholder="aaaaaaaa@example.com"
                  register={register('email', {
                    required: 'メールアドレスは必須です',
                    pattern: {
                      value:
                        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                      message: 'メールアドレスが不正です',
                    },
                  })}
                  error={errors.email}
                />
                <Input
                  theme="パスワード"
                  type="password"
                  placeholder="パスワードを入力"
                  register={register('password', {
                    required: 'パスワードは必須です',
                    minLength: {
                      value: 8,
                      message: 'パスワードは8文字以上です',
                    },
                  })}
                  error={errors.password}
                />
                <Input
                  theme="郵便番号"
                  type="text"
                  placeholder="郵便番号"
                  register={register('address_attributes.postal_code', {
                    required: '郵便番号は必須です',
                    pattern: {
                      value: /^\d{3}-?\d{4}$/,
                      message: '郵便番号が不正です',
                    },
                  })}
                  error={errors.address_attributes?.postal_code}
                />
                <Input
                  theme="都道府県"
                  type="text"
                  placeholder="都道府県"
                  register={register('address_attributes.prefecture', {
                    required: '都道府県は必須です',
                  })}
                  error={errors.address_attributes?.prefecture}
                />
                <Input
                  theme="市区町村"
                  type="text"
                  placeholder="市区町村"
                  register={register('address_attributes.city', {
                    required: '市区町村は必須です',
                  })}
                  error={errors.address_attributes?.city}
                />
                <Input
                  theme="町域・番地"
                  type="text"
                  placeholder="町域・番地"
                  register={register('address_attributes.address1', {
                    required: '町域・番地は必須です',
                  })}
                  error={errors.address_attributes?.address1}
                />
                <Input
                  theme="建物名など"
                  type="text"
                  placeholder="建物名など"
                  register={register('address_attributes.address2')}
                  error={errors.address_attributes?.address2}
                />
                <Input
                  theme="本人携帯"
                  type="tel"
                  placeholder="080-xxxx-xxxx"
                  register={register('telephone_attributes.phone_number', {
                    required: '携帯番号は必須です',
                    pattern: {
                      value: /^0\d{1,4}-\d{1,4}-\d{3,4}$/,
                      message: '携帯番号は不正です',
                    },
                  })}
                  error={errors.telephone_attributes?.phone_number}
                />
                <Input
                  theme="固定電話"
                  type="tel"
                  placeholder="03-xx-xxxx"
                  register={register(
                    'telephone_attributes.landline_phone_number',
                  )}
                  error={errors.telephone_attributes?.landline_phone_number}
                />
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
