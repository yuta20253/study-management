class AddColumnDivisionToDesiredSchool < ActiveRecord::Migration[7.0]
  def change
    add_column :desired_schools, :division, :string, null: false
  end
end
