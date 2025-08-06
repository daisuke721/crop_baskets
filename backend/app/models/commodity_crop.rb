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
  validates :grade,
            inclusion: { in: %w[A B],
                         message: "は A または B を指定してください" },
            allow_nil: true
  validates :condition, length: { maximum: 2000 }, allow_nil: true
end
