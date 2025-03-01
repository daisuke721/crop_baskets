class CreateCrops < ActiveRecord::Migration[7.2]
  def change
    create_table :crops do |t|
      # Want機能のため、category_idは一旦、null: true, foreign_key: falseに設定
      t.references :category, null: true, foreign_key: false
      t.string :name, null: false
      t.string :producing_area, null: false, limit: 50

      t.timestamps
    end
  end
end
