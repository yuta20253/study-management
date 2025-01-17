class AddColumnSubjectToStudyHours < ActiveRecord::Migration[7.0]
  def change
    add_column :study_hours, :subject, :string, null: false
  end
end
