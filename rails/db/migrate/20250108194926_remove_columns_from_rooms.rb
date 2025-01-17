class RemoveColumnsFromRooms < ActiveRecord::Migration[7.0]
  def change
    remove_column :rooms, :from_user_id, :bigint
    remove_column :rooms, :to_user_id, :bigint
  end
end
