class Api::V1::Current::FollowsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    User.find(params[:id])

    if (another_user = User.find(params[:id]))
      # 現在のユーザーと見つかったユーザーが違う、または現在のユーザーが見つかったユーザーを登録している
      if current_user != another_user = User.find(params[:id]) || current_user.following?(another_user = User.find(params[:id]))
        render json: another_user, serializer: UserSerializer, adapter: :json
      end
    else
      # ユーザーが見つからない
      render json: { error: "Userが見つかりません" }, status: :not_found
    end
  end
end
