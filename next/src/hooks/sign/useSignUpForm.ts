import { useForm } from 'react-hook-form'
import { SignUpFormData } from '@/types/SignUp/SignUp'

export const useSignUpForm = () => {
  return useForm<SignUpFormData>({
    defaultValues: {
      family_name: '',
      given_name: '',
      family_name_kana: '',
      given_name_kana: '',
      birthday: new Date(),
      gender: '男',
      email: '',
      password: '',
      address_attributes: {
        prefecture: '',
        city: '',
        address1: '',
        address2: '',
        postal_code: '',
      },
      telephone_attributes: {
        phone_number: '',
        landline_phone_number: '',
      },
    },
  })
}
