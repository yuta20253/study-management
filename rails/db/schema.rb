# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_01_08_215013) do
  create_table "addresses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false, comment: "ユーザーへの外部キー"
    t.string "prefecture", null: false, comment: "都道府県"
    t.string "city", null: false, comment: "市区町村"
    t.string "address1", null: false, comment: "町域、番地等"
    t.string "address2", comment: "建物名、部屋番号等"
    t.string "postal_code", comment: "郵便番号"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_addresses_on_user_id"
  end

  create_table "aspirations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "desired_school_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["desired_school_id"], name: "index_aspirations_on_desired_school_id"
    t.index ["user_id"], name: "index_aspirations_on_user_id"
  end

  create_table "desired_schools", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "university", null: false, comment: "大学"
    t.string "faculty", null: false, comment: "学部"
    t.string "department", comment: "学科"
    t.float "deviation_value", null: false, comment: "偏差値"
    t.string "location", null: false, comment: "所在地"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "region"
    t.string "undergraduate_system"
    t.integer "code", null: false
    t.integer "faculty_of_code", null: false
    t.text "explanation"
    t.string "capacity"
    t.string "division", null: false
    t.string "department_system", null: false, comment: "学科区分"
  end

  create_table "likes", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "from_user_id", null: false
    t.integer "to_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "room_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "relation_ships", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "room_users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "room_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_room_users_on_room_id"
    t.index ["user_id"], name: "index_room_users_on_user_id"
  end

  create_table "rooms", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms_users", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "room_id", null: false
    t.bigint "user_id", null: false
  end

  create_table "study_hours", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "todo_id", null: false, comment: "Todo"
    t.string "title", null: false
    t.integer "actual_learning_time", comment: "実学習時間"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "subject", null: false
    t.integer "study_type", null: false
    t.index ["todo_id"], name: "index_study_hours_on_todo_id"
  end

  create_table "telephones", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "phone_number", comment: "携帯電話番号"
    t.string "landline_phone_number", comment: "固定電話番号"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["landline_phone_number"], name: "index_telephones_on_landline_phone_number", unique: true
    t.index ["phone_number"], name: "index_telephones_on_phone_number", unique: true
    t.index ["user_id"], name: "index_telephones_on_user_id"
  end

  create_table "todos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false, comment: "ユーザー"
    t.string "subject", null: false, comment: "科目"
    t.string "title", null: false, comment: "タイトル"
    t.text "description", comment: "本文(感想)"
    t.integer "progress", default: 0, null: false, comment: "ステータス(0:未完了, 10: 途中 ,20: 完了)"
    t.integer "scheduled_study_time", null: false, comment: "予定学習時間"
    t.datetime "due_date", comment: "期限"
    t.integer "importance", default: 10, comment: "重要度(0:低, 10: 中 ,20: 高)"
    t.integer "star_rating", default: 0, comment: "Max 星5つ"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_hour", default: 0, null: false, comment: "総学習時間"
    t.integer "study_type", null: false
    t.index ["user_id"], name: "index_todos_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "family_name"
    t.string "family_name_kana"
    t.string "given_name"
    t.string "given_name_kana"
    t.integer "age"
    t.integer "gender", default: 0
    t.date "birthday"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "aspirations", "desired_schools"
  add_foreign_key "aspirations", "users"
  add_foreign_key "messages", "users"
  add_foreign_key "room_users", "rooms"
  add_foreign_key "room_users", "users"
  add_foreign_key "study_hours", "todos"
  add_foreign_key "telephones", "users"
  add_foreign_key "todos", "users"
end
