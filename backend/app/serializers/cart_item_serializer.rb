class CartItemSerializer < ActiveModel::Serializer
  # カート機能に必要な情報
  attributes :id, :total_price

  # CommodityCropListSerializerの情報を追加
  belongs_to :commodity_crop, serializer: CommodityCropListSerializer
end
