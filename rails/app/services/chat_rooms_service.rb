class ChatRoomsService
  def initialize(current_user)
    @current_user = current_user
  end

  def call
    chat_rooms = Room.for_user(@current_user).recent.map do |chat_room|
      # 部屋の情報（相手のユーザーは誰か、最後に送信されたメッセージはどれか）をJSON形式で作成
      {
        chat_room: chat_room.as_json,
        other_user: chat_room.users.where.not(id: @current_user.id).first.as_json,
        last_message: chat_room.messages.last.as_json(only: [:content, :created_at]),
      }
    end
    users = User.all.as_json
    { rooms: chat_rooms, users: }
  end
end
