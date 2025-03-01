class CartItem < ApplicationRecord
  belongs_to :consumer, optional: true
  belongs_to :commodity_crop
end
