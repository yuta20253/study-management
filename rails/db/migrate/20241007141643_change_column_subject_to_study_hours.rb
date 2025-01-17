class ChangeColumnSubjectToStudyHours < ActiveRecord::Migration[7.0]
  def change
    change_column_null :study_hours, :subject, true
  end
end
