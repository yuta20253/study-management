import useSWR from 'swr'

export const useUserState = () => {
  type userStateType = {
    id: number
    family_name: string
    family_name_kana: string
    given_name: string
    given_name_kana: string
    birthday: Date
    gender: string
    email: string
    isSignedIn: boolean
    isFetched: boolean
    address: {
      id: number
      user_id: number
      prefecture: string
      city: string
      address1: string
      address2: string
      postal_code: string
    }
    telephone: {
      id: number
      user_id: number
      phone_number: string
      landline_phone_number: string
    }
    following_users: [
      {
        follower_id: number
        followed_id: number
      },
    ]
    follower_users: [
      {
        follower_id: number
        followed_id: number
      },
    ]
    followers: [
      {
        follower_id: number
        followed_id: number
      },
    ]
    followeds: [
      {
        follower_id: number
        followed_id: number
      },
    ]
  }

  const fallbackData: userStateType = {
    id: 0,
    family_name: '',
    family_name_kana: '',
    given_name: '',
    given_name_kana: '',
    birthday: new Date(1900, 1, 1),
    gender: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
    address: {
      id: 0,
      user_id: 0,
      prefecture: '',
      city: '',
      address1: '',
      address2: '',
      postal_code: '',
    },
    telephone: {
      id: 0,
      user_id: 0,
      phone_number: '',
      landline_phone_number: '',
    },
    following_users: [
      {
        follower_id: 0,
        followed_id: 0,
      },
    ],

    follower_users: [
      {
        follower_id: 0,
        followed_id: 0,
      },
    ],
    followers: [
      {
        follower_id: 0,
        followed_id: 0,
      },
    ],
    followeds: [
      {
        follower_id: 0,
        followed_id: 0,
      },
    ],
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [userStateType, (value: userStateType) => void]
}
