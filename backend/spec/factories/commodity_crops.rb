FactoryBot.define do
  factory :commodity_crop do
    name { '新鮮にんじん' }
    variety { '向陽二号' }
    harvest_day { Data.today }
    capacity { 10 }
    price { 1000 }
    description { '新鮮で美味しいにんじん' }
    association :crop
  end
end
