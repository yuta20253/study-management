class AddColumnStudyTypeToTodo < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :study_type, :integer, null: false
  end
end
