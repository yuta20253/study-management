import Link from 'next/link'
import { LinkProps } from '@/types/DesiredSchool/Button/button'

export const LinkButton: React.FC<LinkProps> = ({ url, title }: LinkProps) => {
  return (
    <button>
      <Link href={url}>{title}</Link>
    </button>
  )
}
