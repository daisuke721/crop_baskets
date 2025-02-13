class CreateCommodityCropImages < ActiveRecord::Migration[7.2]
  def change
    create_table :commodity_crop_images do |t|
      t.references :commodity_crop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
