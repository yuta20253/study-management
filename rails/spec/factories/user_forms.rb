FactoryBot.define do
  factory :user_form do
    transient do
      person { Gimei.name }
    end
    family_name { person.first.kanji }
    given_name { person.last.kanji }
    family_name_kana { person.first.katakana }
    given_name_kana { person.last.katakana }
    gender { :male }
    birthday { Faker::Date.birthday }
    password { Faker::Internet.password(min_length: 10) }
    confirmed_at { Time.current }

    # Create associated address and telephone
    after(:build) do |user_form|
      user = user_form.user
      # Create address and telephone with valid data
      user.address ||= build(:address, user:)
      user.telephone ||= build(:telephone, user:)
    end
  end
end
