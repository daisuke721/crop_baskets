class Api::V1::Producers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: '登録成功（Producer）', producer: resource }, status: :ok
    else
      render json: { message: '登録失敗（Producer）', errors: resource.errors.full_message }, status: :unprocessable_entity
    end
  end

  def respond_to_on_destroy
    render json: { message: 'アカウント削除成功（Producer）' }, status: :ok
  end
end
