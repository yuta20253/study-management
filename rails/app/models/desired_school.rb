class DesiredSchool < ApplicationRecord
  has_many :aspirations, dependent: :destroy
  has_many :users, through: :aspirations

  # SCHOOLS = Array[
  # "北海道", "東北", "東京", "名古屋", "京都", "大阪", "九州", "早稲田", "慶應", "法政"
  # ]

  validates :university, presence: true
  validates :faculty, presence: true
  validates :department, presence: true, allow_blank: true
  validates :deviation_value, presence: true, numericality: { greater_than_or_equal_to: 35.0, less_than_or_equal_to: 75.0 }
  validates :department_system, presence: true
  validates :location, presence: true
  validates :code, presence: true
  validates :faculty_of_code, presence: true
  validates :division, presence: true
  validates :capacity, presence: true
  validates :undergraduate_system, presence: true
end
