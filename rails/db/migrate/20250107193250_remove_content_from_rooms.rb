class RemoveContentFromRooms < ActiveRecord::Migration[7.0]
  def change
    remove_column :rooms, :content, :string
  end
end
