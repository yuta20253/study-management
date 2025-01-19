class Like < ApplicationRecord
  belongs_to :to_user, class_name: "User", inverse_of: :likes_to
  belongs_to :from_user, class_name: "User", inverse_of: :likes_from

  # 自分が相手にLikeしているかを確認するスコープ
  scope :for_users, ->(from_user, to_user) { where(from_user_id: from_user.id, to_user_id: to_user.id) }
end
