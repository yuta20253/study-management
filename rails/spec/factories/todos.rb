FactoryBot.define do
  factory :todo do
    subject { "英語" }
    title { "鎌倉殿の十三人" }
    description { "" }
    progress { :incomplete }
    scheduled_study_time { 10 }
    due_date {}
    importance { :medium }
    star_rating { 1 }
    total_hour { 0 }
    study_type { :preparation }
    created_at { Time.zone.now.beginning_of_day }
    association :user

    factory :todo_with_study_hours do
      after(:create) do |todo|
        create(:study_hour, todo:)
      end
    end

    trait :build_todo_with_study_hours do
      after(:build) do |todo|
        create(:study_hour, todo:)
      end
    end
  end
end
