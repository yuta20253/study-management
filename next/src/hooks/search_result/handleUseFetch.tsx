import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useUserState } from "../useGlobalState"
import { University } from "@/types/SearchResult"


export const useFetch = () => {
    const [user] = useUserState()
    const [jsonUniversity, setJsonUniversity] = useState<University[]>([])
    useEffect(() => {
        if (user.isSignedIn) {
          const url =
            process.env.NEXT_PUBLIC_API_BASE_URL + '/current/search_result'
          const headers = {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          }
          axios({ method: 'GET', url: url, headers: headers })
            .then((res: AxiosResponse) => {
              setJsonUniversity(res.data)
            })
            .catch((e: AxiosError<{ error: string }>) => console.log(e.message))
        }
      }, [user.isSignedIn])
    return {
        jsonUniversity
    }
}