class ChangeColumnNullFalseToUser < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :family_name, false
    change_column_null :users, :family_name_kana, false
    change_column_null :users, :given_name, false
    change_column_null :users, :given_name_kana, false
    change_column_null :users, :birthday, false
  end
end
