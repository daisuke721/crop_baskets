class CommodityCrop < ApplicationRecord
  belongs_to :producer
  belongs_to :receiving_point
  belongs_to :crop
  has_many :commodity_crop_images, dependent: :destroy

  # フィールドのバリデーション
  validates :name, presence: true
  validates :variety, presence: true
  validates :harvest_day, presence: true
  validates :capacity, numericality: { greater_than: 0 }
  validates :price, numericality: { greater_than: 0 }
  validates :description, presence: true
end
