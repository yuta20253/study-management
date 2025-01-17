import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { DesiredSchoolProps } from '@/types/DesiredSchool'

export const useClickDeleteFetch = (
  id: number,
  isDelete: boolean,
  setIsDelete: (value: SetStateAction<boolean>) => void,
  universities: DesiredSchoolProps[] | undefined,
  setUniversities: Dispatch<SetStateAction<DesiredSchoolProps[] | undefined>>,
) => {
  const router = useRouter()
  const handleClick = () => {
    console.log('削除しようとしています')
    console.log(`削除するid:::::::::::::${id}`)
    setIsDelete(!isDelete)
    if (isDelete) {
      setUniversities((prevDesiredSchools) => {
        return prevDesiredSchools?.filter((desiredSchool) => {
          return desiredSchool.id !== id
        })
      })
    }

    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL + `/current/desired_schools/${id}`

    const header = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    axios({
      method: 'DELETE',
      url: url,
      headers: header,
      data: universities,
    })
      .then(() => {
        console.log('削除しました')
        setIsDelete(!isDelete)
        router.reload()
      })
      .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
  }

  return {
    handleClick,
  }
}
