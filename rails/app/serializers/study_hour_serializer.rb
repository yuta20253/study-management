class StudyHourSerializer < ActiveModel::Serializer
  attributes :id, :title, :subject, :actual_learning_time, :study_type, :todo_id, :created_at, :updated_at
  belongs_to :todo, serializer: TodoSerializer

  def study_type
    object.study_type_i18n
  end
end
