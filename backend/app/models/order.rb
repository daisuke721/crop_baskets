class Order < ApplicationRecord
  belongs_to :consumer, optional: true
  belongs_to :payment_method, optional: true
end
