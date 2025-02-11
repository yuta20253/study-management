class Api::V1::Current::FollowsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    if (another_user = User.find(params[:id]))
      if current_user != another_user || current_user.following?(another_user)
        study_hours_data = fetch_study_hours(another_user)
        render json: { another_user:, **study_hours_data }, adapter: :json
      end
    else
      # ユーザーが見つからない
      render json: { error: "Userが見つかりません" }, status: :not_found
    end
  end

  private

    def fetch_study_hours(user)
      {
        all_study_hours: user.study_hours.except_first_study_hours,
        one_day_study_hours: user.study_hours.within_one_day.except_first_study_hours,
        one_week_study_hours: user.study_hours.within_one_week.except_first_study_hours,
        one_month_study_hours: user.study_hours.within_one_month.except_first_study_hours,
        total_hours_within_one_day: user.study_hours.total_hours_within_one_day(Time.zone.now - 1.day),
        total_hours_within_one_week: user.study_hours.total_hours_within_one_week(Time.zone.now - 1.week),
        total_hours_within_one_month: user.study_hours.total_hours_within_one_month(Time.zone.now - 1.month),
      }
    end
end
