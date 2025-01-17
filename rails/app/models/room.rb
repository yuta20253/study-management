class Room < ApplicationRecord
  has_many :room_users
  has_many :users, through: :room_users
  has_many :messages, dependent: :destroy

  # 自分が参加している部屋を取得するスコープ
  scope :for_user, ->(user) { joins(:room_users).where(room_users: { user_id: user.id }) }

  # 作成日で降順に並べ替えるスコープ
  scope :recent, -> { order("created_at DESC") }
end
