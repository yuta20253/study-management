import Link from 'next/link'

type LinkButtonProps = {
  href: string
  text: string
}

const LinkButton = ({ href, text }: LinkButtonProps) => {
  return (
    <button className="h-10 w-full rounded bg-sky-500 px-4 py-2 text-white sm:w-auto">
      <Link href={href}>
        <p className="text-white">{text}</p>
      </Link>
    </button>
  )
}

export default LinkButton
