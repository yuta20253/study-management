//苗字が謎にカタカナになる

export type FollowingUser = {
  id: number
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
}

export type FollowerUser = {
  id: number
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
}

export type EditUserProps = {
  user: {
    id: number
    family_name_kana: string
    family_name: string
    given_name_kana: string
    given_name: string
    age: number
    gender: string
    birthday: Date
    email: string
  }
  address: {
    id: number
    user_id: number
    prefecture: string
    city: string
    address1: string
    address2: string
    postal_code: string
    full_address?: string // 追加: full_address
  }
  telephone: {
    id: number
    user_id: number
    phone_number: string
    landline_phone_number: string
  }
}

export type RelationShipUser = {
  id: number
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
}

export type FollowsUser = {
  id: number
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  birthday: Date
}
