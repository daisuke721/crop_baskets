class AddReceivingPointIdToCommodityCrops < ActiveRecord::Migration[7.2]
  def change
    add_reference :commodity_crops, :receiving_point, null: false, foreign_key: true
  end
end
