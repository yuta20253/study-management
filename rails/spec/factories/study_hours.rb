FactoryBot.define do
  factory :study_hour do
    association :todo
    association :user
    title { todo.title }
    actual_learning_time { 0 }
    subject { todo.subject }
    study_type { todo.study_type }
  end
end
