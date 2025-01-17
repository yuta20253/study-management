class Api::V1::Current::HomesController < Api::V1::BaseController
  def index
    render json: { message: "Welcome to Home!" }, status: :ok
  end
end
