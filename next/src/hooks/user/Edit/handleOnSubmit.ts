import axios, { AxiosError } from 'axios'
import { NextRouter } from 'next/router'
import { EditUserProps } from '@/types/User'
import { userEditType } from '@/types/User/edit'
export const onSubmitHandler = (
  user: userEditType,
  setUser: (value: userEditType) => void,
  router: NextRouter,
  data: EditUserProps,
) => {
  console.log(data)
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user'
  const header = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }

  const patchData = {
    form: {
      ...data,
    },
  }

  axios({ method: 'PATCH', headers: header, url: url, data: patchData })
    .then(() => {
      console.log('個人情報を更新しました')
      setUser({
        ...user,
        isFetched: false,
      })
      router.push('/current/user')
    })
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
      router.push('/current/user/edit')
    })
}
