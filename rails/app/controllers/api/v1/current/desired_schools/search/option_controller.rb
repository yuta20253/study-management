class Api::V1::Current::DesiredSchools::Search::OptionController < Api::V1::BaseController
  before_action :authenticate_user!
  def create
    check_result = params[:checkedItems]
    Rails.logger.debug "#################"
    Rails.logger.debug check_result.to_s
    # puts "#{check_result}"
    Rails.logger.debug "#################"
    Rails.logger.debug "Optionのcreateです"

    # render json: check_result
  end
end
