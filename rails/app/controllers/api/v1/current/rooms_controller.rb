class Api::V1::Current::RoomsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    chat_rooms_service = ChatRoomsService.new(current_user)
    result = chat_rooms_service.call

    render json: result
  end

  def show
    chat_room = Room.find(params[:id])
    if chat_room.nil?
      return render json: { status: :bad_request, message: "Roomが見つかりません" }, status: :not_found
    end

    messages = chat_room.messages.order("created_at ASC")

    messages.each do |message|
      puts message.user_id
    end
    render json: { messages: }
  end

  def create
    result = Room.create_chat_room(current_user, like_params)
    if result[:status] == :ok
      render json: { status: :ok, chat_room: result[:chat_room], message: "チャットルームが作成されました！" }
    else
      error_message = result[:message] || "チャットルームの作成に失敗しました"
      render json: { status: result[:status], message: error_message }, status: result[:status]
    end
  end

  private

    def like_params
      params.require(:like).permit(:from_user_id, :to_user_id)
    end
end
