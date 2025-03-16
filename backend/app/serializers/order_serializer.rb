class OrderSerializer < ActiveModel::Serializer
  # 購入に必要な情報を取得
  attributes :id, :total_price, :created_at
end
