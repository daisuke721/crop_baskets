class CommodityCropImage < ApplicationRecord
  belongs_to :commodity_crop
  # Active Storageで画像を保存、これによりcommodity_crop_imageに画像がアップロードできるようになる
  has_one_attached :image

  # APIレスポンスに画像のURLを含める
  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end
