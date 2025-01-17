class AddColumnStudyTypeToStudyHours < ActiveRecord::Migration[7.0]
  def change
    add_column :study_hours, :study_type, :integer, null: false
  end
end
