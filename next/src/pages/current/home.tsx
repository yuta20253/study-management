import GroupIcon from '@mui/icons-material/Group'
import ListIcon from '@mui/icons-material/List'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Person from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import TimerIcon from '@mui/icons-material/Timer'
import type { NextPage } from 'next'

import useSWR from 'swr'
import { LoadingScreen } from '@/components/Loading'
import IconLink from '@/components/page/home/Link/IconLink'
import { useRequireSignedIn } from '@/hooks/useRequireSignIn'
import { fetcher } from '@/utils'

const Home: NextPage = () => {
  useRequireSignedIn()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/home'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <LoadingScreen />
  console.log(data)
  return (
    <div className="w-full">
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="m-2 sm:m-4">
          <div className="my-4 items-center justify-center text-5xl sm:text-6xl md:text-8xl">
            <p className="text-center">{data.message}</p>
          </div>
          <div>
            <IconLink Icon={Person} href={'/current/user'} text={'個人情報'} />
            <IconLink
              Icon={ListIcon}
              href={'/current/todos'}
              text={'Todo一覧'}
            />
            <IconLink
              Icon={TimerIcon}
              href={'/current/management'}
              text={'学習時間管理'}
            />
            <IconLink
              Icon={SchoolIcon}
              href={'/current/desired_schools'}
              text={'大学一覧'}
            />
            <IconLink
              Icon={GroupIcon}
              href={'/current/user/relationships'}
              text={'アプリを使用している人'}
            />
            <IconLink
              Icon={MailOutlineIcon}
              href={'/current/rooms'}
              text={'チャット機能'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
