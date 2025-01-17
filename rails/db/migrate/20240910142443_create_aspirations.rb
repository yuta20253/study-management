class CreateAspirations < ActiveRecord::Migration[7.0]
  def change
    create_table :aspirations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :desired_school, null: false, foreign_key: true
      t.timestamps
    end
  end
end
