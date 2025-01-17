class UserFormSerializer < ActiveModel::Serializer
  attributes :id, :family_name, :family_name_kana, :given_name, :given_name_kana, :age, :gender, :birthday
  has_one :address, serializer: AddressSerializer
  has_one :telephone, serializer: TelephoneSerializer
  has_many :followers, serializer: FollowSerializer
  has_many :followeds, serializer: FollowedSerializer
  # emailが必要な場合のみemail: trueとする
  attribute :email, if: -> { instance_options[:email] }
  # passwordが必要な場合のみpassword: trueとする
  attribute :password, if: -> { instance_options[:password] }

  def gender
    object.gender_i18n
  end
end
