class Api::V1::Current::RelationshipsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    users = User.all

    if users.empty?
      render json: { error: "ユーザーが見つかりません" }, status: :not_found
    else
      render json: users, adapter: :json
    end
  end

  # フォローするとき
  def create
    to_follow = current_user.follow(params[:user_id])
    render json: to_follow
  end

  # フォロー外すとき
  def destroy
    # puts "user_id:::::#{params[:user_id]}"
    to_unfollow = current_user.unfollow(params[:user_id])
    render json: to_unfollow
  end

  # フォロー一覧
  def followings
    user = current_user
    follows = user.following_users
    render json: follows
  end

  # フォロワー一覧
  def followers
    user = current_user
    followers = user.follower_users
    render json: followers
  end
end
