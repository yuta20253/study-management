# require "json"
class Api::V1::Current::DetailsController < Api::V1::BaseController
  include LoadJson
  before_action :authenticate_user!
  before_action :load_json_data

  def show
    school_id = params[:school_id]
    id = params[:id]

    # faculty_data = {}
    faculty_data = FacultyDataFinderService.new(@universities_data, id).call

    render json: { faculty_data:, school_id:, id: }
  end

  private

    def load_json_data
      @universities_data = []
      load_json(@universities_data)
    end
end
