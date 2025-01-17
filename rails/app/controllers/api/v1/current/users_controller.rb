class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, only: [:show, :edit, :update]

  def show
    user = current_user
    render json: user, serializer: CurrentUserSerializer, email: true, password: true
  end

  def edit
    user_form = UserForm.new(current_user)
    render json: user_form.user, serializer: UserFormSerializer
  end

  def update
    user_form = UserForm.new(current_user)
    user_form.assign_attributes(params[:form])
    if user_form.user.save
      render json: user_form.user, serializer: UserFormSerializer
    else
      render json: { error: user_form.user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
