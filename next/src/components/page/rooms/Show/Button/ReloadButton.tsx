import { useRouter } from 'next/router'

export const ReloadButton = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.reload()}
      className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
    >
      リロード
    </button>
  )
}
