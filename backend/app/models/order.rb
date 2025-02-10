class Order < ApplicationRecord
  belongs_to :consumer
  belongs_to :payment_method
end
