class Api::V1::Current::SchoolsController < Api::V1::BaseController
  include LoadJson

  before_action :authenticate_user!

  def show
    # JSONデータを読み込む
    universities_data = []
    load_univerities_json(universities_data)

    # 入力された学校IDと大学IDに基づいて検索
    query = params[:id]

    school_finder = SchoolFinderService.new(query, universities_data)

    result, status = school_finder.find_university

    if status == :ok
      render json: result[:university_data][:uni]
    else
      render json: result, status:
    end
  end

  private

    def load_univerities_json(universities_data)
      unless load_json(universities_data)
        render json: { error: "データの読み込みに失敗しました" }, status: :internal_server_error
      end
    end
end
