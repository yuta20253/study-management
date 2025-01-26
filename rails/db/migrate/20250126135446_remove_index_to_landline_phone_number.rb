class RemoveIndexToLandlinePhoneNumber < ActiveRecord::Migration[7.0]
  def change
    remove_index :telephones, :landline_phone_number
  end
end
