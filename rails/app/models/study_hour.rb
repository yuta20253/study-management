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
  scope :within_one_day, -> { where("study_hours.created_at > ? ", 1.day.ago) }
  scope :within_one_week, -> { where("study_hours.created_at > ? ", 1.week.ago) }
  scope :within_one_month, -> { where("study_hours.created_at > ?", 1.month.ago) }
  scope :total_hours_within_one_day, ->(period) {
    where("study_hours.created_at > ?", period).sum(:actual_learning_time)
  }
  scope :total_hours_within_one_week, ->(period) {
    where("study_hours.created_at > ?", period).sum(:actual_learning_time)
  }
  scope :total_hours_within_one_month, ->(period) {
    where("study_hours.created_at > ?", period).sum(:actual_learning_time)
  }
end
