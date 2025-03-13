class Api::V1::CartItemsController < ApplicationController
  before_action :set_cart_item, only: [:destroy]
  # カートの中身を取得
  def index
    cart_items = CartItem.includes(commodity_crop: :commodity_crop_images).all
    render json: cart_items, each_serializer: CartItemSerializer
  end

  # 商品をカートに追加
  def create
    cart_item = CartItem.new(cart_item_params)

    if cart_item.save
      render json: cart_item, serializer: CartItemSerializer, status: :created
    else
      render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 商品の削除
  def destroy
    if @cart_item
      @cart_item.destroy
      head :no_content
    else
      render json: { error: "Cart item not found" }, status: :not_found
    end
  end

  private

  def cart_item_params
    params.require(:cart_item).permit(:consumer_id, :commodity_crop_id, :total_price)
  end

  def set_cart_item
    @cart_item = CartItem.find_by(id: params[:id])
  end
end
