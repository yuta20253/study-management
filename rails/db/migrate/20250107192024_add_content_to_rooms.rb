class AddContentToRooms < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :content, :string
  end
end
