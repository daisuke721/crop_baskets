class Api::V1::ProducerInformationsController < ApplicationController
  before_action :authenticate_producer!

  def create
    info = current_producer.build_producer_information(producer_information_params)

    if info.save
      info.image.attach(params[:producer_information][:image]) if params[:producer_information][:image].present?
      render json: info, status: :created
    else
      render json: { errors: info.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    info = current_producer.producer_information
    if info&.destroy
      render json: { message: "削除しました" }
    else
      render json: { error: "削除できませんでした" }, status: :unprocessable_entity
    end
  end

  def my_information
    info = current_producer.producer_information
    if info
      render json: info
    else
      render json: { error: "登録情報がありません" }, status: :not_found
    end
  end

  private

  def producer_information_params
    params.require(:producer_information).permit(:name, :comment)
  end
end
