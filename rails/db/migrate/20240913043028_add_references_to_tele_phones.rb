class AddReferencesToTelePhones < ActiveRecord::Migration[7.0]
  def change
    add_reference :telephones, :user, null: false, foreign_key: true
  end
end
