class Api::V1::Current::ManagementController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    study_hours = current_user.study_hours.except_first_study_hours
    all_study_hours = StudyHour.all.except_first_study_hours
    if study_hours.empty?
      render json: { error: "ユーザーの学習詳細データがありません" }, status: :not_found
    elsif all_study_hours.empty?
      render json: { error: "全体の学習詳細データがありません" }, status: :not_found
    else
      render json: { study_hours: study_hours.as_json(include: :todo), all_study_hours: all_study_hours.as_json(include: :todo) }
    end
  end
end
