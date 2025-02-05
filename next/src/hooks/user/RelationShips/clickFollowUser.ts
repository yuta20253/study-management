import axios, { AxiosError } from 'axios'
import { NextRouter } from 'next/router'

export const useClickFollowUserHandlers = (router: NextRouter) => {
  const handleClickFollowUser = (id: number) => {
    const postUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user/relationships'

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const data = {
      user_id: id,
    }

    axios({
      method: 'POST',
      url: postUrl,
      data: data,
      headers: headers,
    })
      .then(() => {
        console.log('送信しました')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
    router.reload()
  }

  return {
    handleClickFollowUser,
  }
}
