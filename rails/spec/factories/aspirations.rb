FactoryBot.define do
  factory :aspiration do
    association :user
    association :desired_school
  end
end
