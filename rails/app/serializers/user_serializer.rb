class UserSerializer < ActiveModel::Serializer
  # ライバルユーザーのserializer attributesは未追加
  attributes :id, :family_name, :given_name, :family_name_kana, :given_name_kana, :birthday
  # has_many :followers
  # has_many :followeds
end
