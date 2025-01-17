class RenameRoomNameToFromAndToUserIds < ActiveRecord::Migration[7.0]
  def change
    # Roomテーブルのnameカラムを削除
    remove_column :rooms, :name, :string

    # 新しくfrom_user_idとto_user_idを追加
    add_column :rooms, :from_user_id, :bigint, null: false
    add_column :rooms, :to_user_id, :bigint, null: false

    # 外部キー制約を追加（ユーザーを参照）
    add_foreign_key :rooms, :users, column: :from_user_id
    add_foreign_key :rooms, :users, column: :to_user_id

    # 必要ならインデックスを追加
    add_index :rooms, :from_user_id
    add_index :rooms, :to_user_id
  end
end
