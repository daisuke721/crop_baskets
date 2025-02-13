class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      # Want機能のため、consumer_idは一旦、null: true, foreign_key: falseに設定
      t.references :consumer, null: true, foreign_key: false
      # Want機能のため、payment_method_idは一旦、null: true, foreign_key: falseに設定
      t.references :payment_method, null: true, foreign_key: false
      t.decimal :total_price, null, false, precision: 10, scale: 2

      t.timestamps
    end
  end
end
