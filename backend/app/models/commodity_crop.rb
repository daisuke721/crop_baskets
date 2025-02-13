class CommodityCrop < ApplicationRecord
  belongs_to :producer, optional: true
  belongs_to :crop
  has_many :commodity_crop_images
end
