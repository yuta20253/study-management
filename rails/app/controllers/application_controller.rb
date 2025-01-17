class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession

  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from StandardError, with: :handle_standard_error
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
  rescue_from ActionController::ParameterMissing, with: :handle_parameter_missing
  rescue_from ArgumentError, with: :render_bad_request

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up,
                                        keys: [:family_name, :given_name, :family_name_kana, :given_name_kana, :birthday, :gender,
                                               address_attributes: [:prefecture, :city, :address1, :address2, :postal_code], telephone_attributes: [:phone_number, :landline_phone_number]])
    end

  private

    # 標準的なエラー処理
    def handle_standard_error(exception)
      logger.error exception.message
      logger.error exception.backtrace.join("\n")
      render json: { error: "予期せぬエラーが発生しました" }, status: :internal_server_error
    end

    # レコードが見つからない場合のエラー処理
    def handle_record_not_found(exception)
      render json: { error: "#{exception.model}が見つかりません" }, status: :not_found
    end

    # パラメーターが不足している場合のエラー処理
    def handle_parameter_missing(exception)
      render json: { error: "必須パラメータが欠落しています: #{exception.param}" }, status: :unprocessable_entity
    end

    def render_bad_request(exception)
      render json: { error: "リクエストが無効です" }, status: :bad_request
    end
end
