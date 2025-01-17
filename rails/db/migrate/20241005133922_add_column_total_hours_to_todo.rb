class AddColumnTotalHoursToTodo < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :total_hour , :integer, null: false, default: 0, comment: "総学習時間"
  end
end
