class CreateCartItems < ActiveRecord::Migration[7.2]
  def change
    create_table :cart_items do |t|
      # Want機能のため、consumer_idは一旦、null: true, foreign_key: falseに設定
      t.references :consumer, null: true, foreign_key: false
      t.references :commodity_crop, null: false, foreign_key: true
      t.decimal :total_price, null: false, precision: 10, scale: 2

      t.timestamps
    end
  end
end
