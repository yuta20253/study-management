class CreateJoinTableRoomsUsers < ActiveRecord::Migration[7.0]
  def change
    create_join_table :rooms, :users do |t|
      # t.index [:room_id, :user_id]
      # t.index [:user_id, :room_id]
    end
  end
end
