class StudyHour < ApplicationRecord
  belongs_to :todo
  has_one :user, through: :todo

  enum :study_type, { preparation: 0, lesson: 10, review: 20 }

  with_options presence: true do
    validates :title
    validates :todo_id
    validates :subject
    validates :study_type
  end

  validates :actual_learning_time, length: { miximum: 0, maximum: 24 }

  scope :except_first_study_hours, -> { where("actual_learning_time > ?", 0).includes([:todo]) }
end
