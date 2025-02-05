import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextRouter } from 'next/router'

export const useClickUnFollowUserHandlers = (router: NextRouter) => {
  const handleClickUnfollowUser = (id: number) => {
    const deleteUrl =
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
      method: 'DELETE',
      url: deleteUrl,
      data: data,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
    router.reload()
  }
  return {
    handleClickUnfollowUser,
  }
}
