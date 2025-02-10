class CreateCartItems < ActiveRecord::Migration[7.2]
  def change
    create_table :cart_items do |t|
      t.references :consumer, null: false, foreign_key: true
      t.references :commodity_crop, null: false, foreign_key: true
      t.decimal :total_price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
