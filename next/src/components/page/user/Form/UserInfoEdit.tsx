import { Dispatch, SetStateAction } from 'react'
import { FieldErrors } from 'react-hook-form'
import { UserBirthdayEditInput } from './UserBirthdayEditInput'
import { UserBuildingEditInput } from './UserBuildingEditInput'
import { UserGenderEditRadio } from './UserGenderEditRadio'
import { UserNameEditInput } from './UserNameEditInput'
import { UserPhoneEditInput } from './UserPhoneEditInput'
import { EditUserProps } from '@/types/User'
import {
  nameKanaRules,
  nameRules,
  postalCodeRule,
  buildingRule,
  phoneNumberRules,
} from '@/validations/user/validation'

type UserInfo = {
  family_name_kana: string
  given_name_kana: string
  family_name: string
  given_name: string
  birthday: Date
  gender: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  postal_code: string
  prefecture: string
  city: string
  address1: string
  address2: string
  phone_number: string
  landline_phone_number: string
  errors: FieldErrors<EditUserProps>
}

export const UserInfoEdit = ({
  family_name_kana,
  given_name_kana,
  family_name,
  given_name,
  birthday,
  gender,
  selected,
  setSelected,
  postal_code,
  prefecture,
  city,
  address1,
  address2,
  phone_number,
  landline_phone_number,
  errors,
}: UserInfo) => {
  return (
    <table className="w-full border border-slate-500">
      <tbody>
        <UserNameEditInput
          theme="氏名カナ"
          first={family_name_kana}
          last={given_name_kana}
          label_first={'氏名カナ（姓)'}
          label_second={'氏名カナ（名)'}
          registerFirstProps="user.family_name_kana"
          registerSecondProps="user.given_name_kana"
          rules={nameKanaRules}
          errorFirst={errors.user?.family_name_kana}
          errorSecond={errors.user?.given_name_kana}
        />
        <UserNameEditInput
          theme="氏名"
          first={family_name}
          last={given_name}
          label_first={'氏名カナ'}
          label_second={'氏名カナ'}
          registerFirstProps="user.family_name"
          registerSecondProps="user.given_name"
          rules={nameRules}
          errorFirst={errors.user?.family_name}
          errorSecond={errors.user?.given_name}
        />
        <UserBirthdayEditInput
          theme="生年月日"
          date={String(birthday)}
          registerProps="user.birthday"
          error={errors.user?.birthday}
        />
        <UserGenderEditRadio
          theme="性別"
          gender={gender}
          registerProps="user.gender"
          selected={selected}
          setSelected={setSelected}
        />
        <UserBuildingEditInput
          theme="郵便番号"
          props={postal_code}
          registerProps={'address.postal_code'}
          rules={postalCodeRule}
          error={errors.address?.postal_code}
        />
        <UserBuildingEditInput
          theme="都道府県"
          props={prefecture}
          registerProps={'address.prefecture'}
          rules={buildingRule}
          error={errors.address?.prefecture}
        />
        <UserBuildingEditInput
          theme="市区町村"
          props={city}
          registerProps={'address.city'}
          rules={buildingRule}
          error={errors.address?.city}
        />
        <UserBuildingEditInput
          theme="町域・番地"
          props={address1}
          registerProps={'address.address1'}
          rules={buildingRule}
          error={errors.address?.address1}
        />
        <UserBuildingEditInput
          theme="建物名など"
          props={address2}
          registerProps={'address.address2'}
          error={errors.address?.address2}
        />
        <UserPhoneEditInput
          theme="本人携帯"
          props={phone_number}
          registerProps={'telephone.phone_number'}
          rules={phoneNumberRules}
          error={errors.telephone?.phone_number}
        />
        <UserPhoneEditInput
          theme="固定電話"
          props={landline_phone_number}
          registerProps={'telephone.landline_phone_number'}
        />
      </tbody>
    </table>
  )
}
