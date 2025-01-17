class FollowedSerializer < ActiveModel::Serializer
  attributes :follower_id, :followed_id
  belongs_to :user, serializer: CurrentUserSerializer
end
