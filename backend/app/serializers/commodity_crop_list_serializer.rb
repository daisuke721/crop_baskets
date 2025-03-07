class CommodityCropListSerializer < ActiveModel::Serializer
  # 作物一覧時に必要な基本情報
  attributes :id, :name, :capacity, :price

  # CommodityCropImageSerializerを利用し、作物に関連する画像を取得
  has_many :commodity_crop_images, serializer: CommodityCropImageSerializer
end
