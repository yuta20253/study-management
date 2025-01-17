class ChangeColumnNullTrueToUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :family_name, true
    change_column_null :users, :family_name_kana, true
    change_column_null :users, :given_name, true
    change_column_null :users, :given_name_kana, true
    change_column_null :users, :birthday, true
  end
end
