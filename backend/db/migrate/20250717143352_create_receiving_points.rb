class CreateReceivingPoints < ActiveRecord::Migration[7.2]
  def change
    create_table :receiving_points do |t|
      t.references :producer, null: false, foreign_key: true
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
