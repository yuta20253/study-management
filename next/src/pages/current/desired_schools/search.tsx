import { NextPage } from 'next'
import LinkButton from '@/components/page/Common/LinkButton'
import { SelectSearchLink } from '@/components/page/desired_schools/Block/SelectSearchLink'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'

const Search: NextPage = () => {
  useRequireSignedIn()

  return (
    <div className="mt-10 flex w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {/* Links Section */}
        <div className="space-y-4">
          <SelectSearchLink
            theme="各種条件から探す"
            href="/current/desired_schools/search/option"
          />
          <SelectSearchLink
            theme="都道府県から探す"
            href="/current/desired_schools/search/prefecture_search"
          />
        </div>

        {/* Back Button */}
        <div className="mt-5 flex justify-end">
          <LinkButton href={'/current/desired_schools'} text={'前に戻る'} />
        </div>
      </div>
    </div>
  )
}

export default Search
