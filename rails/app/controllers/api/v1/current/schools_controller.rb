class Api::V1::Current::SchoolsController < Api::V1::BaseController
  include LoadJson

  before_action :authenticate_user!

  def show
    # JSONデータを読み込む
    universities_data = []
    unless load_json(universities_data)
      return render json: { error: "データの読み込みに失敗しました" }, status: :internal_server_error
    end

    # 入力された学校IDと大学IDに基づいて検索
    query = params[:id]

    # 整数に変換可能かをチェック
    begin
      query_id = Integer(query)
    rescue ArgumentError
      # 無効なID（Integer変換できない場合）は400エラーを返す
      return render json: { error: "リクエストが無効です" }, status: :bad_request
    end

    unless valid_school_id?(query)
      return render json: { error: "学校が見つかりません" }, status: :not_found
    end

    show_universities_data = nil

    # 大学コードが一致するものを検索
    universities_data[0].each do |university_data|
      university_data["uni"]["data"].each do |uni|
        if uni["code"] == query_id
          show_universities_data = university_data
          break
        end
      end
      break if show_universities_data
    end

    # 学校が見つからなかった場合
    if show_universities_data.nil?
      return render json: { error: "大学が見つかりません" }, status: :not_found
    end

    # 最終的に大学情報が見つかればそのデータを返す
    render json: show_universities_data
  end

  private

    def valid_school_id?(school_id)
      Rails.logger.debug "大学コードが一致しているかの確認です"
      Rails.logger.debug "学校IDの確認: #{school_id}"
      valid_ids = ["10000", "10001", "10002", "10003", "10004", "10005", "10006", "10007", "20001", "20002", "20003"]
      valid_ids.include?(school_id)
    end
end
