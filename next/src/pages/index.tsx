import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils/Common'

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current'
  console.log(url)
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occured.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
    </>
  )
}

export default Index
