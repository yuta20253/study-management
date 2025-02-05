import axios, { AxiosError } from 'axios'
import { NextRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { DesiredSchoolProps, University } from '@/types/DesiredSchool'

export const onSubmitHandler = (
  data: DesiredSchoolProps,
  jsonUniversity: University[][],
  router: NextRouter,
  setError: Dispatch<SetStateAction<string | null>>,
) => {
  const submitUniversity = data.university + '大学'

  const foundUniversity = jsonUniversity
    .flat()
    .find((uni) => uni.uni.school === submitUniversity)

  console.log('Found University:', foundUniversity)
  if (foundUniversity) {
    const postSchool = foundUniversity.uni.school
    const postCode = foundUniversity.uni.data[0].code

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/schools/${postCode}`
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const d = { code: postCode, school: postSchool }

    axios
      .get(url, { headers, data: d })
      .then(() => {
        router.push(`/current/schools/${postCode}`)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
        router.push('/current/desired_schools')
      })
  } else {
    setError('学校が見つかりません')
  }
}
