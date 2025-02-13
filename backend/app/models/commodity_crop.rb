class CommodityCrop < ApplicationRecord
  belongs_to :producer
  belongs_to :crop
  has_many :commodity_crop_images
end
