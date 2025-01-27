import Link from 'next/link'
import { LinkButtonProps } from '@/types/Common'

const LinkButton = ({ href, text }: LinkButtonProps) => {
  return (
    <button className="h-8 rounded bg-sky-500 px-2 py-1 ">
      <Link href={href}>
        <p className="text-white">{text}</p>
      </Link>
    </button>
  )
}

export default LinkButton
