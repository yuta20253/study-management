import axios, { AxiosResponse, AxiosError } from 'axios'

//axiosを用いてAPIからのデータ取得を行う関数
export const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      console.log(err.message)
      throw err
    })
