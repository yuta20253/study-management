class TelephoneSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :phone_number, :landline_phone_number
  belongs_to :user, serializer: CurrentUserSerializer
end
