class AddColumnCodeToDesiredSchool < ActiveRecord::Migration[7.0]
  def change
    add_column :desired_schools, :code, :integer, null: false
  end
end
