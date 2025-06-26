class Api::V1::Producers::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    token = Warden::JWTAuth::UserEncoder.new.call(resource, :producer, nil).first
    response.set_header('Authorization', "Bearer #{token}")
    render json: { message: 'ログイン成功（Producer）', producer: resource }, status: :ok
  end

  def respond_to_on_destroy
    render json: { message: 'ログアウト（Producer）' }, status: :ok
  end
end
