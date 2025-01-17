import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { Faculty } from '@/types/Schools/Details/id'

export const useFetch = () => {
  const [user] = useUserState()
  //const [details, setDetails] = useState<University[]>([])
  const [facultyData, setFacultyData] = useState<Faculty>()
  const router = useRouter()
  const { school_id, id } = router.query
  //console.log(school_id, id)

  useEffect(() => {
    if (user.isSignedIn) {
      // school_idをどう取得するか
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL +
        `/current/schools/${school_id}/details/${id}`

      const header = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }

      const data = { school_id: school_id, faculty_of_code: id }

      axios({ method: 'GET', url: url, headers: header, data: data })
        .then((res: AxiosResponse) => {
          //console.log(res.data)
          //setDetails(res.data)
          setFacultyData(res.data)
        })
        .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
    }
  }, [user.isSignedIn, school_id, id])
  return {
    facultyData,
    school_id,
    id,
  }
}
