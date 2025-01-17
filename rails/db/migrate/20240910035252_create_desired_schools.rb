class CreateDesiredSchools < ActiveRecord::Migration[7.0]
  def change
    create_table :desired_schools do |t|
      t.string :university, null: false, comment: "大学"
      t.string :faculty, null: false ,comment: "学部"
      t.string :department, comment: "学科"
      t.float :deviation_value, null: false, comment: "偏差値"
      t.string :location, null: false, comment: "所在地"

      t.timestamps
    end
  end
end
