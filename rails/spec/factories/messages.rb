FactoryBot.define do
  factory :message do
    association :user
    association :room
    content { "メッセージ" }
  end
end
