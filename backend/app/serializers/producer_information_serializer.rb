class ProducerInformationSerializer < ActiveModel::Serializer
  attributes :id, :name, :comment, :image_url

  # rails_blob_urlを使って画像のURLを取得
  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(object.image,
                                                          host: ENV.fetch('RAILS_API_HOST',
                                                                          'http://localhost:8000'))
    end
  end
end
