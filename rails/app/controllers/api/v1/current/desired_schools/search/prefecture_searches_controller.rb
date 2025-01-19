class Api::V1::Current::DesiredSchools::Search::PrefectureSearchesController < Api::V1::BaseController
  include LoadJson
  before_action :authenticate_user!

  def index
    universities_data = []
    load_json(universities_data)
    data_size = 0 # jsonデータ内にあるdataの中の要素数
    universities_data[0].count.times do |i|
      universities_data[0][i]["uni"]["data"].count.times do
        data_size += 1
      end
    end

    universities_arr = []
    university_prefecture_arr = []
    universities_name_arr = []
    universities = []

    # puts "要素数:::#{data_size}"
    universities_data[0].count.times do |i|
      universities_arr.push(universities_data[0][i]["uni"]["data"])
      university_prefecture_arr.push(universities_data[0][i]["uni"]["prefecture"])
      universities_name_arr.push(universities_data[0][i]["uni"]["school"])
      universities.push(universities_data[0][i]["uni"])
      universities_arr.flatten!
    end

    render json: { universities: }
  end
end
