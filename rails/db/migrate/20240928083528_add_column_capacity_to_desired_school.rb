class AddColumnCapacityToDesiredSchool < ActiveRecord::Migration[7.0]
  def change
    add_column :desired_schools, :capacity, :string
  end
end
