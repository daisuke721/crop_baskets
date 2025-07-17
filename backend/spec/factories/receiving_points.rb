FactoryBot.define do
  factory :receiving_point do
    producer { nil }
    name { "MyString" }
    address { "MyString" }
    latitude { 1.5 }
    longitude { 1.5 }
  end
end
