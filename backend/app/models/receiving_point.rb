class ReceivingPoint < ApplicationRecord
  belongs_to :producer

  # バリデーション
  validates :name, presence: true, length: { maximum: 50 }
  validates :address, presence: true, length: { maximum: 100 }
end
