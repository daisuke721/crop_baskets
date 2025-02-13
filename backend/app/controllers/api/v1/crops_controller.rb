class Api::V1::CropsController < ApplicationController
  def index
    crops = Crop.all
    render json: crops
  end

  def show
    crop = Crop.find(params[:id])
    render json: crop
  end
end
