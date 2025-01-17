import Link from 'next/link'

type LinkButtonProps = {
  href: string
  text: string
}

const RelationStatusLink = ({ href, text }: LinkButtonProps) => {
  return (
    <div className="w-full text-center">
      <Link href={href} className="text-sky-500 hover:underline">
        {text}
      </Link>
    </div>
  )
}

export default RelationStatusLink
