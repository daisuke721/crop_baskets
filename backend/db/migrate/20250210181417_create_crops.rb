class CreateCrops < ActiveRecord::Migration[7.2]
  def change
    create_table :crops do |t|
      t.string :name
      t.string :producing_area

      t.timestamps
    end
  end
end
