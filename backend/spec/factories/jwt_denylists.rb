FactoryBot.define do
  factory :jwt_denylist do
    jti { "MyString" }
    exp { "2025-06-12 22:42:08" }
  end
end
