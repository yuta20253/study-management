class Api::V1::Current::DesiredSchoolsController < Api::V1::BaseController
  include LoadJson
  before_action :authenticate_user!
  before_action :load_json_data, only: [:index, :new]
  before_action :validate_desired_school_count, only: :create

  def index
    universities = current_user.desired_schools
    render json: { universities: universities, universities_data: @universities_data }, adapter: nil
  end

  def new
    render json: @universities_data, serializer: DesiredSchoolSerializer, adapter: nil
  end

  def create
    current_user.desired_schools.create!(desired_school_params)
    render json: { message: "志望校を登録しました" }, status: :created
  end

  def destroy
    desired_school = current_user.desired_schools.find(params[:id])
    if desired_school
      desired_school.destroy!
      render json: { message: "志望校の登録を解除しました" }, status: :ok
    else
      render json: { message: "志望校の解除に失敗しました" }, status: :not_found
    end
  end

  private

    def desired_school_params
      params.require(:desired_school).permit(
        :id, :university, :faculty, :department, :deviation_value, :location, :region,
        :undergraduate_system, :department_system, :code, :division, :faculty_of_code, :capacity
      )
    end

    def validate_desired_school_count
      max_school_count = 5
      if current_user.desired_schools.size >= max_school_count
        render json: { error: "登録できる志望校は５つまでです！" }, status: :bad_request
      end
    end

    def load_json_data
      @universities_data = []
      load_json(@universities_data)
    end
end
