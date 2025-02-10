class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      t.references :consumer, null: false, foreign_key: true
      t.references :payment_method, null: false, foreign_key: true
      t.decimal :total_price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
