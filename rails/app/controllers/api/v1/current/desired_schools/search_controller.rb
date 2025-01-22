class Api::V1::Current::DesiredSchools::SearchController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    #params[:search]
    # puts "#{search_result}"
  end
end
