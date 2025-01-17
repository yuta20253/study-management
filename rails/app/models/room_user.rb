class RoomUser < ApplicationRecord
  belongs_to :room
  belongs_to :user

  # 特定の部屋に参加しているユーザーを取得するスコープ
  scope :for_room, -> { where(room_id: room.id) }
end
