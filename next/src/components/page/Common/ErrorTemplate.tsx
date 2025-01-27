import LinkButton from './LinkButton'
import { ErrorProps } from '@/types/Common'

export const ErrorTemplate = ({ error, href, text }: ErrorProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4 sm:px-8">
      <div className="w-full items-center justify-center text-center sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="mb-4 text-3xl font-bold text-red-600">{error}</h1>
        {/* エラーメッセージの真下にボタンを配置 */}
        <LinkButton href={href} text={text} />
      </div>
    </div>
  )
}
