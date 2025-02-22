import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils/Common'

const Index: NextPage = () => {
  // 環境に応じてAPIのベースURLを設定
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : 'https://study-management.com'

  console.log(url)

  const { data, error } = useSWR(url, fetcher)
  console.log(data)

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-red-500 p-4 text-white shadow-lg">
          <h2 className="text-xl font-semibold">エラーが発生しました。</h2>
        </div>
      </div>
    )

  if (!data)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-blue-500 p-4 text-white shadow-lg">
          <h2 className="text-xl font-semibold">読み込み中...</h2>
        </div>
      </div>
    )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-blue-600">
          Study Management
        </h1>
        <div className="w-full max-w-md rounded-lg bg-white p-6 text-center">
          <h2 className="mb-4 text-xl font-bold">できること</h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔️</span>Todo管理
            </li>
          </ul>
          <ul className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔️</span>
              学習時間をグラフで表示
            </li>
          </ul>
          <ul className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔️</span>大学検索と登録
            </li>
          </ul>
          <ul className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔️</span>
              他のUser学習時間を確認できる
            </li>
          </ul>
          <ul className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✔️</span>
              メッセージのやり取りができる(リアルタイム通信はできていない)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Index
