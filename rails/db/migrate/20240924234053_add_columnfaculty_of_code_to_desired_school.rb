class AddColumnfacultyOfCodeToDesiredSchool < ActiveRecord::Migration[7.0]
  def change
    add_column :desired_schools, :faculty_of_code, :integer, null: false
  end
end
