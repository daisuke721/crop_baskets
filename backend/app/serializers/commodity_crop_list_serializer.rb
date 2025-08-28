class CommodityCropListSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  # 作物一覧時に必要な基本情報
  attributes :id, :name, :capacity, :price, :crop_producing_area, :harvest_day, :receiving_point, :grade, :condition,
             :producer_display_name, :producer_icon_url

  # commodity_crop_images を明示的に追加
  attribute :commodity_crop_images do
    object.commodity_crop_images.map do |image|
      { image_url: Rails.application.routes.url_helpers.rails_blob_url(image.image, host: ENV.fetch('RAILS_API_HOST', 'http://localhost:8000')) }
    end
  end

  # 作物の産地を取得するメソッド
  def crop_producing_area
    object.crop.producing_area
  end

  # 受け取り所を取得するメソッド
  def receiving_point
    return unless object.receiving_point

    {
      id: object.receiving_point.id,
      name: object.receiving_point.name,
      address: object.receiving_point.address
    }
  end

  # 生産者の公開プロフィール
  def producer_display_name
    object.producer&.producer_information&.name
  end

  def producer_icon_url
    info = object.producer&.producer_information
    return unless info&.image&.attached?
    rails_blob_url(info.image, host: ENV.fetch('RAILS_API_HOST', 'http://localhost:8000'))
  end
end
