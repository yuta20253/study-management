class Todo < ApplicationRecord
  before_create :build_study_hours
  belongs_to :user
  has_many :study_hours, dependent: :destroy

  accepts_nested_attributes_for :study_hours, allow_destroy: true, update_only: true

  # create時に、子モデルのオブジェクトをビルド
  def build_study_hours
    study_hours.build(
      title: self.title,
      subject: self.subject,
      actual_learning_time: 0,
      study_type: self.study_type,
      todo_id: self.id,
    )
  end

  enum :progress, { incomplete: 0, on_the_way: 10, complete: 20 }, validate: true
  enum :importance, { low: 0, medium: 10, high: 20 }, validate: true
  enum :study_type, { preparation: 0, lesson: 10, review: 20 }, validate: true

  validates :title, presence: true
  validates :user_id, presence: true
  validates :subject, presence: true
  validates :description, allow_blank: true, length: { miximum: 1, maximum: 200 }
  validates :star_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }

  validate :due_date_cannot_register_in_the_past

  private

    def due_date_cannot_register_in_the_past
      if due_date.present? && due_date < Time.zone.today
        errors.add(:due_date, "過去日は登録できません")
      end
    end
end
