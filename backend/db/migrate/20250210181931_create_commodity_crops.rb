class CreateCommodityCrops < ActiveRecord::Migration[7.2]
  def change
    create_table :commodity_crops do |t|
      t.references :producer, null: false, foreign_key: true
      t.references :crop, null: false, foreign_key: true
      t.references :commodity_crop_image, null: false, foreign_key: true
      t.string :name
      t.string :variety
      t.datetime :harvest_day
      t.float :capacity
      t.integer :price
      t.text :description

      t.timestamps
    end
  end
end
