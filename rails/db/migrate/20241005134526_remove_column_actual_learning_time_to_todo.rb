class RemoveColumnActualLearningTimeToTodo < ActiveRecord::Migration[7.0]
  def change
    remove_column :todos, :actual_learning_time
  end
end
