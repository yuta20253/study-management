import Link from 'next/link'
import { SelectSearchLinkProps } from '@/types/DesiredSchool/Link/DesiredSchoolLinkType'

export const SelectSearchLink = ({ theme, href }: SelectSearchLinkProps) => {
  return (
    <section className="my-4 flex flex-col items-center justify-between border-b border-slate-500 sm:flex-row">
      <h2 className="mb-2 text-xl sm:mb-0 sm:text-lg">{theme}</h2>
      <button className="m-1 w-full sm:w-auto">
        <Link
          href={href}
          className="w-full rounded bg-sky-500 px-3 py-2 text-center text-white sm:w-auto"
        >
          選択
        </Link>
      </button>
    </section>
  )
}
