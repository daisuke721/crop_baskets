class CommodityCropDetailSerializer < ActiveModel::Serializer
  # 作物の詳細に必要な基本情報
  attributes :id, :name, :variety, :harvest_day, :capacity, :price, :description, :crop_name, :crop_producing_area

  # CommodityCropImageSerializerを利用し、作物に関連する画像を取得
  has_many :commodity_crop_images, serializer: CommodityCropImageSerializer

  # 作物情報を追加
  belongs_to :crop

  # 作物名を取得
  def crop_name
    object.crop.name
  end

  # 作物の産地を取得
  def crop_producing_area
    object.crop.producing_area
  end
end
