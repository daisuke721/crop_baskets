FactoryBot.define do
  factory :producer do
    email { 'email@email' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
