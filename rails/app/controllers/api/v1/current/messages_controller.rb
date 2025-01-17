class Api::V1::Current::MessagesController < Api::V1::BaseController
  before_action :authenticate_user!

  def create
    room = Room.find(params[:room_id])
    message = room.messages.new(create_message)
    message.user = current_user

    if message.save
      render json: message, status: :created
    else
      render json: { error: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def create_message
      params.require(:message).permit(:content)
    end
end
