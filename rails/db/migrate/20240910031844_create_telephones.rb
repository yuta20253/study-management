class CreateTelephones < ActiveRecord::Migration[7.0]
  def change
    create_table :telephones do |t|
      t.string :phone_number, index: { unique: true }, comment: "携帯電話番号"
      t.string :landline_phone_number, index: { unique: true }, comment: "固定電話番号"
      t.timestamps
    end
  end
end
