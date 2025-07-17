class Api::V1::Producers::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if current_producer
      render json: { message: 'ログイン成功（Producer）', producer: current_producer }, status: :ok
    else
      render json: { message: 'ログイン失敗（Producer）' }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    render json: { message: 'ログアウト（Producer）' }, status: :ok
  end
end
