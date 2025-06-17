class Api::V1::Consumers::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { message: 'ログイン成功（Consumer）', consumer: resource }, status: :ok
  end

  def respond_to_on_destroy
    render json: { message: 'ログアウト成功（Consumer）' }, status: :ok
  end
end
