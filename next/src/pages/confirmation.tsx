import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Confirmation: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (router.query['confirmation_token']) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/user/confirmations'
      axios({ method: 'PATCH', url: url, data: router.query })
        .then(() => {
          router.push('/sign_in')
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
        })
    }
  }, [router])
  return <></>
}

export default Confirmation
