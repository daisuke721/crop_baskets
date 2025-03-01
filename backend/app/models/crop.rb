class Crop < ApplicationRecord
  has_many :commodity_crops, dependent: :destroy
end
