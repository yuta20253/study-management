class Api::V1::User::ConfirmationsController < Api::V1::BaseController
  def update
    user = User.find_by(confirmation_token: params[:confirmation_token])
    return render json: { message: "ユーザーが見つかりません" }, status: :not_found if user.nil?
    return render json: { message: "ユーザーはすでに確認済みです" }, status: :bad_request if user.confirmed?

    user.update!(confirmed_at: Time.current)
    render json: { message: "ユーザーの確認が成功しました" }, status: :ok
  end
end
