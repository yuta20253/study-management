# require "json"

class Api::V1::Current::SearchResultController < Api::V1::BaseController
  include LoadJson

  before_action :authenticate_user!
  def index
    universities_data = []
    load_json(universities_data)

    university_search_service = UniversitySearchService.new(universities_data)
    universities_arr = university_search_service.call

    render json: universities_arr
  end
end
