class Api::V1::CommodityCropsController < ApplicationController
  # Deviseの認証用フィルター
  before_action :authenticate_producer!, only: [:create, :update, :my_list]

  # アクションの共通化
  before_action :set_commodity_crop, only: [:show, :update, :destroy]

  def index
    commodity_crops = CommodityCrop.includes(:crop, :commodity_crop_images).all
    render json: commodity_crops, each_serializer: CommodityCropListSerializer
  end

  def show
    render json: @commodity_crop, serializer: CommodityCropDetailSerializer
  end

  def create
    commodity_crop = CommodityCrop.new(commodity_crop_params)
    # ログイン中の生産者を紐付け
    commodity_crop.producer = current_producer

    Rails.logger.info "params[:commodity_crop][:images] = #{params.dig(:commodity_crop, :images).inspect}"

    # 保存前に画像がなければエラーを返す
    if params.dig(:commodity_crop, :images).blank?
      return render json: { errors: ["画像を登録してください"] }, status: :unprocessable_entity
    end

    if commodity_crop.save
      # 画像が送信されたら画像があるかpresent?で確認しeach文で1つずつcommodity_crop_imagesに保存
      if params.dig(:commodity_crop, :images).present?
        # Arrayを使って強制的に配列に変換し、画像が1枚でも複数でも対応
        Array(params[:commodity_crop][:images]).each do |image|
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

  def update
    # ログイン中の生産者と商品作物が一致しなければエラー
    if @commodity_crop.producer != current_producer
      return render json: { error: "権限がありません" }, status: :unauthorized
    end

    # 商品作物を更新
    if @commodity_crop.update(commodity_crop_params)
      # 新しく追加された画像があれば保存
      if params.dig(:commodity_crop, :images).present?
        Array(params[:commodity_crop][:images]).each do |image|
          commodity_crop_image = @commodity_crop.commodity_crop_images.create
          commodity_crop_image.image.attach(image)
        end
      end

      render json: @commodity_crop, serializer: CommodityCropDetailSerializer
    else
      render json: { errors: @commodity_crop.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @commodity_crop
      @commodity_crop.destroy
      head :no_content
    else
      render json: { error: "商品作物が見つかりませんでした" }, status: :not_found
    end
  end

  # ログイン中の生産者が出品した作物一覧
  def my_list
    # 出品した商品作物に紐づく作物情報・画像を取得
    commodity_crops = current_producer.commodity_crops.includes(:crop, :commodity_crop_images)
    render json: commodity_crops, each_serializer: CommodityCropListSerializer
  end

  private

  def commodity_crop_params
    params.require(:commodity_crop).permit(:crop_id, :name, :variety, :harvest_day, :capacity, :price, :description, :receiving_point_id, :grade, :condition)
  end

  def set_commodity_crop
    @commodity_crop = CommodityCrop.includes(:crop, :commodity_crop_images).find(params[:id])
  end
end
