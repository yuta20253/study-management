import Link from 'next/link'

type SelectSearchLinkProps = {
  theme: string
  href: string
}

export const SelectSearchLink = ({ theme, href }: SelectSearchLinkProps) => {
  return (
    <section className="my-4 flex flex-col sm:flex-row justify-between items-center border-b border-slate-500">
      <h2 className="text-xl sm:text-lg mb-2 sm:mb-0">{theme}</h2>
      <button className="w-full sm:w-auto m-1">
        <Link
          href={href}
          className="w-full sm:w-auto rounded bg-sky-500 px-3 py-2 text-white text-center"
        >
          選択
        </Link>
      </button>
    </section>
  )
}
