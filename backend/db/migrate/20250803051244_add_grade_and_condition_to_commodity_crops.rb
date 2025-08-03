class AddGradeAndConditionToCommodityCrops < ActiveRecord::Migration[7.2]
  def change
    add_column :commodity_crops, :grade, :string, if_not_exists: true
    add_column :commodity_crops, :condition, :text, if_not_exists: true
    add_index :commodity_crops, :grade, if_not_exists: true

    # DB制約でA/Bのみ許可
    add_check_constraint :commodity_crops,
      "(grade IS NULL OR grade IN ('A','B'))",
      name: "chk_commodity_crops_grade_ab"
  end
end
