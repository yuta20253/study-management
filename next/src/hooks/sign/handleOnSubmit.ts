import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextRouter } from 'next/router'
import { SignUpFormData } from '@/types/SignUp/SignUp'

export const handleSignUp = async (
  data: SignUpFormData,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
) => {
  setIsLoading(true)
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
  const headers = {
    'Content-Type': 'application/json',
  }
  const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/sign_in'

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
      localStorage.setItem('access-token', res.headers['access-token'] || '')
      localStorage.setItem('client', res.headers['client'] || '')
      localStorage.setItem('uid', res.headers['uid'] || '')
      router.push('/sign_in')
    })
    .catch((err: AxiosError<{ error: string }>) => {
      console.log(err.message)
    })

  setIsLoading(false)
}
