class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.references :user, null: false , comment: "ユーザーへの外部キー"
      t.string :prefecture, null: false ,comment: "都道府県"
      t.string :city, null: false , comment: "市区町村"
      t.string :address1, null: false , comment: "町域、番地等"
      t.string :address2 , comment: "建物名、部屋番号等"
      t.string :postal_code, comment: "郵便番号"

      t.timestamps
    end
  end
end
