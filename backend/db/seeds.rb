# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Crop.create!([
  { name: "ごぼう", producing_area: "宮崎県産" },
  { name: "ごぼう", producing_area: "鹿児島県産" },
  { name: "ごぼう", producing_area: "青森県産" },
  { name: "さつまいも", producing_area: "宮崎県産" },
  { name: "さつまいも", producing_area: "鹿児島県産" },
  { name: "さつまいも", producing_area: "熊本県産" },
  { name: "さつまいも", producing_area: "茨城県産" },
  { name: "じゃがいも", producing_area: "宮崎県産" },
  { name: "じゃがいも", producing_area: "鹿児島県産" },
  { name: "じゃがいも", producing_area: "北海道産" },
  { name: "さといも", producing_area: "宮崎県産" },
  { name: "さといも", producing_area: "岩手県産" },
  { name: "キャベツ", producing_area: "宮崎県産" },
  { name: "キャベツ", producing_area: "鹿児島県産" },
  { name: "キャベツ", producing_area: "群馬県産" },
  { name: "にんじん", producing_area: "北海道産" },
  { name: "にんじん", producing_area: "千葉県産" }
])
