class CreateCommodityCrops < ActiveRecord::Migration[7.2]
  def change
    create_table :commodity_crops do |t|
      # Want機能のため、producer_idは一旦、null: true, foreign_key: falseに設定
      t.references :producer, null: true, foreign_key: false
      t.references :crop, null: false, foreign_key: true
      t.string :name, null: false
      t.string :variety, null: false, limit: 50
      t.datetime :harvest_day, null: false
      t.float :capacity, null: false
      t.integer :price, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
