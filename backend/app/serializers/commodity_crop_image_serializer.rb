class CommodityCropImageSerializer < ActiveModel::Serializer
  attributes :id, :image_url

  # rails_blob_urlを使って画像のURLを取得
  def image_url
    object.image.attached? ? Rails.application.routes.url_helpers.rails_blob_url(object.image, host: ENV.fetch('BACKEND_ORIGIN', 'http://localhost:8000')) : nil
  end
end
