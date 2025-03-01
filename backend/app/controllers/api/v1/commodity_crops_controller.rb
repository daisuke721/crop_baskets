class Api::V1::CommodityCropsController < ApplicationController
  def index
    commodity_crops = CommodityCrop.includes(:crop, :commodity_crop_images).all
    render json: commodity_crops, include: [:crop, :commodity_crop_images]
  end

  def create
    commodity_crop = CommodityCrop.new(commodity_crop_params)

    if commodity_crop.save
      # 画像が送信されたら画像があるかpresent?で確認しeach文で1つずつcommodity_crop_imagesに保存
      if params[:commodity_crop][:images].present?
        params[:commodity_crop][:images].each do |image|
          # commodity_crop_images.create で CommodityCropImage レコードを作成
          commodity_crop_image = commodity_crop.commodity_crop_images.create
          commodity_crop_image.image.attach(image) # 画像ファイルをサーバーに保存する
        end
      end

      render json: commodity_crop, include: [commodity_crop_images: { methods: :image_url }], status: :created
    else
      render json: { errors: commodity_crop.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def commodity_crop_params
    params.require(:commodity_crop).permit(:crop_id, :name, :variety, :harvest_day, :capacity, :price, :description)
  end
end
