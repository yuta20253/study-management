import Link from 'next/link'
import React from 'react'
import { IconLinkProps } from '@/types/Home'

const IconLink: React.FC<IconLinkProps> = ({ Icon, href, text }) => {
  return (
    <div className="my-2 flex text-center sm:my-4">
      <div>
        <Icon className="text-4xl sm:text-5xl md:text-6xl" />
      </div>
      <div className="mx-3 h-12 sm:mx-5">
        <Link href={href}>
          <span className="text-xl sm:text-2xl md:text-3xl">{text}</span>
        </Link>
      </div>
    </div>
  )
}

export default IconLink
