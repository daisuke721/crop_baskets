class Api::V1::Consumers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: '登録成功（Consumer）', consumer: resource }, status: :ok
    else
      render json: { message: '登録失敗（Consumer）', errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def respond_to_on_destroy
    render json: { message: 'アカウント削除成功（Consumer）' }, status: :ok
  end
end
