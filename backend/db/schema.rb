# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_02_10_183436) do
  create_table "cart_items", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "consumer_id"
    t.bigint "commodity_crop_id", null: false
    t.decimal "total_price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commodity_crop_id"], name: "index_cart_items_on_commodity_crop_id"
    t.index ["consumer_id"], name: "index_cart_items_on_consumer_id"
  end

  create_table "commodity_crop_images", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "commodity_crop_id", null: false
    t.string "image", limit: 500, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commodity_crop_id"], name: "index_commodity_crop_images_on_commodity_crop_id"
  end

  create_table "commodity_crops", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "producer_id"
    t.bigint "crop_id", null: false
    t.string "name", null: false
    t.string "variety", limit: 50, null: false
    t.datetime "harvest_day", null: false
    t.float "capacity", null: false
    t.integer "price", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["crop_id"], name: "index_commodity_crops_on_crop_id"
    t.index ["producer_id"], name: "index_commodity_crops_on_producer_id"
  end

  create_table "crops", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "category_id"
    t.string "name", null: false
    t.string "producing_area", limit: 50, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_crops_on_category_id"
  end

  create_table "orders", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "consumer_id"
    t.bigint "payment_method_id"
    t.decimal "total_price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["consumer_id"], name: "index_orders_on_consumer_id"
    t.index ["payment_method_id"], name: "index_orders_on_payment_method_id"
  end

  add_foreign_key "cart_items", "commodity_crops"
  add_foreign_key "commodity_crop_images", "commodity_crops"
  add_foreign_key "commodity_crops", "crops"
end
