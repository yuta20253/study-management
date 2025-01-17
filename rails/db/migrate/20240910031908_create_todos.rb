class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.references :user, null: false, foreign_key: true, comment: "ユーザー"
      t.string :subject, null: false , comment: "科目"
      t.string :title, null: false , comment: "タイトル"
      t.text :description , comment: "本文(感想)"
      t.integer :progress, null: false, default: 0, comment: "ステータス(0:未完了, 10: 途中 ,20: 完了)"
      t.integer :scheduled_study_time, null: false, comment: "予定学習時間"
      t.integer :actual_learning_time, comment: "実学習時間"
      t.datetime :due_date, comment: "期限"
      t.integer :importance, default: 10 ,comment: "重要度(0:低, 10: 中 ,20: 高)"
      t.integer :star_rating, default: 0, comment: "Max 星5つ"
      t.timestamps
    end
  end
end
