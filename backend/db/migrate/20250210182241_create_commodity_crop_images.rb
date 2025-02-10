class CreateCommodityCropImages < ActiveRecord::Migration[7.2]
  def change
    create_table :commodity_crop_images do |t|
      t.string :image

      t.timestamps
    end
  end
end
