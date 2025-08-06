FactoryBot.define do
  factory :consumer do
    email { 'email@email' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
