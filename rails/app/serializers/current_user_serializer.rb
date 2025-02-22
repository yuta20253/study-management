class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :family_name, :family_name_kana, :given_name, :given_name_kana, :age, :gender, :birthday
  has_one :address, serializer: AddressSerializer
  has_one :telephone, serializer: TelephoneSerializer

  # emailが必要な場合のみemail: trueとする
  attribute :email, if: -> { instance_options[:email] }
  # passwordが必要な場合のみpassword: trueとする
  attribute :password, if: -> { instance_options[:password] }

  def gender
    object.gender_i18n
  end
end
