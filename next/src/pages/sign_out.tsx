import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const SignOut: NextPage = () => {
  const [, setUser] = useUserState()
  const router = useRouter()

  useEffect(() => {
    localStorage.clear()
    setUser({
      id: 0,
      family_name: '',
      family_name_kana: '',
      given_name: '',
      given_name_kana: '',
      birthday: new Date(1900, 1, 1),
      gender: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
      address: {
        id: 0,
        user_id: 0,
        prefecture: '',
        city: '',
        address1: '',
        address2: '',
        postal_code: ''
      },
      telephone: {
        id: 0,
        user_id: 0,
        phone_number: '',
        landline_phone_number: ''
      },
      following_users: [      {
        follower_id: 0,
        followed_id: 0,
      },],
      follower_users: [      {
        follower_id: 0,
        followed_id: 0,
      },],
      followers: [      {
        follower_id: 0,
        followed_id: 0,
      },],
      followeds: [      {
        follower_id: 0,
        followed_id: 0,
      },]
    })
    router.push('/sign_in')
  }, [router, setUser])

  return <></>
}

export default SignOut
