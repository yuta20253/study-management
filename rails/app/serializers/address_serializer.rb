class AddressSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :prefecture, :city, :address1, :address2, :postal_code

  belongs_to :user, serializer: CurrentUserSerializer
end
