export type SignUpFormData = {
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  birthday: Date
  gender: string
  email: string
  password: string
  address_attributes: {
    prefecture: string
    city: string
    address1: string
    address2?: string
    postal_code: string
    user_id: number
  }
  telephone_attributes: {
    phone_number: string
    landline_phone_number: string
    user_id: number
  }
}
