class Api::V1::ReceivingPointsController < ApplicationController
  before_action :authenticate_producer!, only: [:create, :destroy]
  before_action :set_receiving_point, only: [:show, :destroy]

  def index
    receiving_points = ReceivingPoint.all
    render json: receiving_points
  end

  def show
    render json: @receiving_point
  end

  def create
    receiving_point = current_producer.receiving_points.build(receiving_point_params)
    if receiving_point.save
      render json: receiving_point, status: :created
    else
      render json: { errors: receiving_point.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @receiving_point.producer === current_producer
      @receiving_point.destroy
      head :no_content
    else
      render json: { error: '削除できません' }, status: :unauthorized
    end
  end

  private

  def set_receiving_point
    @receiving_point = ReceivingPoint.find(params[:id])
  end

  def receiving_point_params
    params.require(:receiving_point).permit(:name, :address, :latitude, :longitude)
  end
end
