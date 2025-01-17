export type userEditType = {
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
