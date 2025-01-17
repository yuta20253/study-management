class DesiredSchoolSerializer < ActiveModel::Serializer
  attributes :id, :university, :faculty, :department, :deviation_value, :location, :region, :undergraduate_system, :explanation, :capacity, :division,
             :first_exam_subjects, :second_exam_subjects
  # belongs_to :user, serializer: CurrentUserSerializer
end
