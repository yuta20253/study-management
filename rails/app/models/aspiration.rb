class Aspiration < ApplicationRecord
  belongs_to :user
  belongs_to :desired_school
end
