class TodoSerializer < ActiveModel::Serializer
  attributes :id, :subject, :title, :description, :progress, :scheduled_study_time, :total_hour, :due_date, :importance, :star_rating, :study_type, :created_at,
             :updated_at

  has_many :study_hours, serializer: StudyHourSerializer
  belongs_to :user, serializer: CurrentUserSerializer

  def progress
    object.progress_i18n
  end

  def importance
    object.importance_i18n
  end

  def study_type
    object.study_type_i18n
  end

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end

  def updated_at
    object.updated_at.strftime("%Y/%m/%d")
  end
end
