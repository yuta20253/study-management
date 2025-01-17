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
    # sequence(:email) {|n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(min_length: 10) }
    confirmed_at { Time.current }
  end
end
