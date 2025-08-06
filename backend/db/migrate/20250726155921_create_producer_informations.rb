class CreateProducerInformations < ActiveRecord::Migration[7.2]
  def change
    create_table :producer_informations do |t|
      t.references :producer, null: false, foreign_key: true
      t.string :name
      t.text :comment

      t.timestamps
    end
  end
end
