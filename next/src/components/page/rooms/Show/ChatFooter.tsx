import Link from 'next/link'
import React from 'react'

export const ChatFooter: React.FC = () => (
  <button className="w-full sm:w-auto">
    <Link href="/current/rooms" className="text-blue-500 hover:text-blue-700">
      チャット一覧
    </Link>
  </button>
)
