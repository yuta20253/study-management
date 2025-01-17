class AddColumnToDesiredSchool < ActiveRecord::Migration[7.0]
  def change
    add_column :desired_schools, :region , :string
    add_column :desired_schools, :undergraduate_system, :string
  end
end
