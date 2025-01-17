FactoryBot.define do
  factory :address do
    prefecture { "北海道" }
    city { "札幌市" }
    address1 { "５番町" }
    address2 { "" }
    postal_code { "#{Faker::Number.leading_zero_number(digits: 3)}-#{Faker::Number.leading_zero_number(digits: 4)}" }
    association :user
  end
end
