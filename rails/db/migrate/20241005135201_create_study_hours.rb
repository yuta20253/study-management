class CreateStudyHours < ActiveRecord::Migration[7.0]
  def change
    create_table :study_hours do |t|
      t.references :todo, null:false, foreign_key: true, comment: "Todo"
      t.string :title, null: false
      t.integer :actual_learning_time, comment: "実学習時間"
      t.timestamps
    end
  end
end
