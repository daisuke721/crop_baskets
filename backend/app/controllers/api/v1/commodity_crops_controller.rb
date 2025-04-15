class Api::V1::CommodityCropsController < ApplicationController
  def index
    commodity_crops = CommodityCrop.includes(:crop, :commodity_crop_images).all
    render json: commodity_crops, each_serializer: CommodityCropListSerializer
  end

  def show
    commodity_crop = CommodityCrop.includes(:crop, :commodity_crop_images).find(params[:id])
    render json: commodity_crop, serializer: CommodityCropDetailSerializer
  end

  def create
    commodity_crop = CommodityCrop.new(commodity_crop_params)

    # 保存前に画像がなければエラーを返す
    unless params.dig(:commodity_crop, :images).present?
      return render json: { errors: ["画像を登録してください"] }, status: :unprocessable_entity
    end

    if commodity_crop.save
      # 画像が送信されたら画像があるかpresent?で確認しeach文で1つずつcommodity_crop_imagesに保存
      if params.dig(:commodity_crop, :images).present?
        params[:commodity_crop][:images].each do |image|
          # commodity_crop_images.create で CommodityCropImage レコードを作成
          commodity_crop_image = commodity_crop.commodity_crop_images.create
          commodity_crop_image.image.attach(image) # 画像ファイルをサーバーに保存する
        end
      end

      render json: commodity_crop, serializer: CommodityCropDetailSerializer, status: :created
    else
      render json: { errors: commodity_crop.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def commodity_crop_params
    params.require(:commodity_crop).permit(:crop_id, :name, :variety, :harvest_day, :capacity, :price, :description)
  end
end
