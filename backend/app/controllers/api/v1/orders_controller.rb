class Api::V1::OrdersController < ApplicationController
  before_action :set_cart_items, only: [:new, :create]

  # 購入画面のデータを取得
  def new
    total_price = @cart_items.sum(&:total_price)
    render json: {
      # ActiveModel::Serializerを使いデータの形をカスタマイズ/ActiveModel::Serializer**CollectionSerializer.new()で複数のオブジェクトをシリアライズする
      cart_items: ActiveModel::Serializer::CollectionSerializer.new(@cart_items, serializer: CartItemSerializer),
      total_price: total_price
    }
  end

  # 購入処理
  def create
    order = Order.new(total_price: @cart_items.sum(&:total_price))
    order.total_price = @cart_items.sum(&:total_price)

    if order.save
      @cart_items.destroy_all # カートをクリア
      render json: { message: "注文が完了しました", order: OrderSerializer.new(order) }, status: :created
    else
      render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_cart_items
    @cart_items = CartItem.all # カート商品を全て取得する
  end
end
