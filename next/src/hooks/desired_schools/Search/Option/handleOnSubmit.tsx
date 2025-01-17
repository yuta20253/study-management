import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextRouter } from 'next/router'

export const onSubmitHandler = (
  checkedItems: string[],
  deviationValues: number[],
  deviationValuesLists: (deviationValuesArr: number[]) => number[],
  router: NextRouter,
) => {
  console.log('checkedItems', checkedItems)

  const deviationValuesArr = deviationValuesLists(deviationValues)
  console.log(deviationValuesArr)

  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    '/current/desired_schools/search/option'

  const header = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }

  axios({ method: 'POST', url: url, headers: header, data: checkedItems })
    .then((res: AxiosResponse) => {
      localStorage.setItem('checkedItems', JSON.stringify(checkedItems))
      localStorage.setItem(
        'deviationValuesArr',
        JSON.stringify(deviationValuesArr),
      )
      console.log(res.data)
      router.push('/current/search_result')
    })
    .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
}
