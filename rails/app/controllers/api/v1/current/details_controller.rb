# require "json"
class Api::V1::Current::DetailsController < Api::V1::BaseController
  include LoadJson
  before_action :authenticate_user!
  before_action :load_json_data

  def show
    school_id = params[:school_id]
    id = params[:id]

    faculty_data = {}
    @universities_data.each do |university|
      university.each do |univer|
        univer["uni"]["data"].each do |data|
          if data["faculty_of_code"] == Integer(id)
            faculty_data = data
          end
        end
      end
    end

    render json: { faculty_data:, school_id:, id: }
  end

  private

    def load_json_data
      @universities_data = []
      load_json(@universities_data)
    end
end
