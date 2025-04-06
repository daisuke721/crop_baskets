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
  # 宮崎県
  { name: "きゅうり", producing_area: "宮崎県産" },
  { name: "ピーマン", producing_area: "宮崎県産" },
  { name: "キャベツ", producing_area: "宮崎県産" },
  { name: "ごぼう", producing_area: "宮崎県産" },
  { name: "さつまいも", producing_area: "宮崎県産" },
  { name: "にんじん", producing_area: "宮崎県産" },
  { name: "トマト", producing_area: "宮崎県産" },
  { name: "じゃがいも", producing_area: "宮崎県産" },
  { name: "さといも", producing_area: "宮崎県産" },
  { name: "マンゴー", producing_area: "宮崎県産" },

  # 鹿児島県
  { name: "さつまいも", producing_area: "鹿児島県産" },
  { name: "だいこん", producing_area: "鹿児島県産" },
  { name: "そらまめ", producing_area: "鹿児島県産" },
  { name: "ごぼう", producing_area: "鹿児島県産" },
  { name: "キャベツ", producing_area: "鹿児島県産" },
  { name: "たまねぎ", producing_area: "鹿児島県産" },
  { name: "じゃがいも", producing_area: "鹿児島県産" },
  { name: "にんじん", producing_area: "鹿児島県産" },
  { name: "ピーマン", producing_area: "鹿児島県産" },
  { name: "オクラ", producing_area: "鹿児島県産" },

  # 熊本県
  { name: "すいか", producing_area: "熊本県産" },
  { name: "トマト", producing_area: "熊本県産" },
  { name: "いちご", producing_area: "熊本県産" },
  { name: "なす", producing_area: "熊本県産" },
  { name: "メロン", producing_area: "熊本県産" },
  { name: "さつまいも", producing_area: "熊本県産" },
  { name: "きゅうり", producing_area: "熊本県産" },
  { name: "キャベツ", producing_area: "熊本県産" },
  { name: "だいこん", producing_area: "熊本県産" },
  { name: "にんじん", producing_area: "熊本県産" }
])
