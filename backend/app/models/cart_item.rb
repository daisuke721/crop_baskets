class CartItem < ApplicationRecord
  belongs_to :consumer
  belongs_to :commodity_crop
end
