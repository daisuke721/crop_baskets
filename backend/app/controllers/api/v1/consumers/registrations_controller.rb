class Api::V1::Consumers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      token = Warden::JWTAuth::UserEncoder.new.call(resource, :consumer, nil).first
      response.set_header('Authorization', "Bearer #{token}")

      render json: { message: '登録成功（Consumer）', consumer: resource }, status: :ok
    else
      render json: { message: '登録失敗（Consumer）', errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def respond_to_on_destroy
    render json: { message: 'アカウント削除成功（Consumer）' }, status: :ok
  end
end
