class Room < ApplicationRecord
  has_many :room_users, dependent: :destroy
  has_many :users, through: :room_users
  has_many :messages, dependent: :destroy

  # 自分が参加している部屋を取得するスコープ
  scope :for_user, ->(user) { joins(:room_users).where(room_users: { user_id: user.id }) }

  # 作成日で降順に並べ替えるスコープ
  scope :recent, -> { order("created_at DESC") }

  def self.create_chat_room(current_user, like_params)
    # 自分と相手のLikeを確認
    active_like = Like.find_or_initialize_by(like_params)
    if active_like.new_record? && !active_like.save
      return { status: :internal_server_error, message: "予期しないエラーが発生しました" }
    end

    passive_like = Like.for_users(active_like.to_user, active_like.from_user).exists?
    unless passive_like
      return { status: :bad_request, message: "相手がまだあなたをLikeしていません" }
    end

    chat_room = Room.create!
    # 自分と相手のユーザーをチャットルームに追加
    begin
      RoomUser.find_or_create_by!(room_id: chat_room.id, user_id: active_like.from_user_id)
      RoomUser.find_or_create_by!(room_id: chat_room.id, user_id: active_like.to_user_id)
    rescue ActiveRecord::RecordInvalid => e
      return { status: :internal_server_error, message: "チャットルームのユーザー追加に失敗しました: #{e.message}" }
    end

    { status: :ok, chat_room: }
  end
end
