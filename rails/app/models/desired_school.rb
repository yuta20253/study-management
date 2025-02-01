class DesiredSchool < ApplicationRecord
  has_many :aspirations, dependent: :destroy
  has_many :users, through: :aspirations

  with_options presence: true do
    validates :university
    validates :faculty
    validates :department, allow_blank: true
    validates :deviation_value, numericality: { greater_than_or_equal_to: 35.0, less_than_or_equal_to: 75.0 }
    validates :department_system
    validates :location
    validates :code
    validates :faculty_of_code
    validates :division
    validates :capacity
    validates :undergraduate_system
  end
end
