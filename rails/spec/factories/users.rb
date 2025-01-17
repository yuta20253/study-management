FactoryBot.define do
  factory :user do
    sequence(:id, &:to_s)
    transient do
      person { Gimei.name }
    end
    family_name { person.first.kanji }
    given_name { person.last.kanji }
    family_name_kana { person.first.katakana }
    given_name_kana { person.last.katakana }
    gender { :male }
    birthday { Faker::Date.birthday }
    sequence(:email) {|n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(min_length: 10) }
    confirmed_at { Time.current }

    trait :user_with_desired_schools do
      after(:build) do |user|
        user.desired_schools << build(:desired_school)
      end
    end

    trait :user_with_four_desired_schools do
      after(:build) do |user|
        user.desired_schools << create_list(:desired_school, 4)
      end
    end

    trait :user_with_five_desired_schools do
      after(:build) do |user|
        user.desired_schools << create_list(:desired_school, 5)
      end
    end

    trait :user_with_study_hours do
      after(:build) do |user|
        # TODO: = create(:todo,user: user)
        user.study_hours << create_list(:study_hour, 100)
      end
    end
    trait :user_with_address_and_tel do
      after(:create) do |user|
        create(:address, user:)
        create(:telephone, user:)
      end
    end

    trait :not_user_with_address_and_tel do
      after(:create) do |user|
        create(:address, prefecture: "", user:)
        create(:telephone, user:)
      end
    end
  end
end
