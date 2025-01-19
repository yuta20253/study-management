class Api::V1::Current::RoomsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    chat_rooms = Room.for_user(current_user).recent.map do |chat_room|
      # 部屋の情報（相手のユーザーは誰か、最後に送信されたメッセージはどれか）をJSON形式で作成
      {
        chat_room:,
        other_user: chat_room.users.where.not(id: current_user.id).first,
        last_message: chat_room.messages.last,
      }
    end
    users = User.all
    render json: { rooms: chat_rooms, users: }
  end

  def show
    chat_room = Room.find(params[:id])
    if chat_room.nil?
      return render json: { status: 404, message: "Roomが見つかりません" }, status: :not_found
    end

    messages = chat_room.messages.order("created_at ASC")

    messages.each do |mes|
      puts mes.user_id
    end
    render json: { messages: }
  end

  def create
    # 自分と相手のLikeを確認
    active_like = Like.find_or_initialize_by(like_params)

    unless active_like.save
      render json: { status: 500, message: "予期しないエラーが発生しました" }
    end

    passive_like = Like.for_users(active_like.to_user, active_like.from_user).exists?

    unless passive_like
      render json: { status: 400, message: "相手がまだあなたをLikeしていません" } and return
    end

    # チャットルームの作成
    chat_room = Room.create!
    # 自分と相手のユーザーをチャットルームに追加
    RoomUser.find_or_create_by!(room_id: chat_room.id, user_id: active_like.from_user_id)
    RoomUser.find_or_create_by!(room_id: chat_room.id, user_id: active_like.to_user_id)

    render json: { status: 200, chat_room: }
  end

  private

    def like_params
      params.require(:like).permit(:from_user_id, :to_user_id)
    end
end
