FactoryBot.define do
  factory :telephone do
    phone_number { "070-1122-3344" }
    landline_phone_number { "048-1222-1111" }
    association :user
  end
end
