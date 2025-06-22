class Api::V1::Producers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      token = Warden::JWTAuth::UserEncoder.new.call(resource, :producer, nil).first
      response.set_header('Authorization', "Bearer #{token}")
      render json: { message: '登録成功（Producer）', producer: resource }, status: :ok
    else
      render json: { message: '登録失敗（Producer）', errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def respond_to_on_destroy
    render json: { message: 'アカウント削除成功（Producer）' }, status: :ok
  end
end
