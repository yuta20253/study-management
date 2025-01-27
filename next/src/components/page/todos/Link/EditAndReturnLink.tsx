import Link from 'next/link'
import { IdProps } from '@/types/Todo/Link/link'

export const EditAndReturnLink = ({ id }: IdProps) => {
  return (
    <>
      <div className="mt-2 flex items-center justify-center gap-10">
        <div className="h-8  rounded bg-sky-500">
          <Link href={`/current/todos/${id}/edit`}>
            <p className="mx-2 my-1 text-center text-white">編集</p>
          </Link>
        </div>
        <div className="h-8 rounded bg-sky-500">
          <Link href="/current/todos">
            <p className="m-1 text-center text-white">前に戻る</p>
          </Link>
        </div>
      </div>
    </>
  )
}
