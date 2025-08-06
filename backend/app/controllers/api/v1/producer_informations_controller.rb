class Api::V1::ProducerInformationsController < ApplicationController
  before_action :authenticate_producer!

  def create
    info = current_producer.build_producer_information(producer_information_params)

    if info.save
      if params.dig(:producer_information, :image).present?
        info.image.attach(params[:producer_information][:image])
      end
      render json: info, serializer: ProducerInformationSerializer, status: :created
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
      render json: info, serializer: ProducerInformationSerializer, status: :ok
    else
      render json: { producer_information: nil }, status: :ok
    end
  end

  private

  def producer_information_params
    params.require(:producer_information).permit(:name, :comment)
  end
end
