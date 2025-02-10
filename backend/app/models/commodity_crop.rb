class CommodityCrop < ApplicationRecord
  belongs_to :producer
  belongs_to :crop
  belongs_to :commodity_crop_image
end
