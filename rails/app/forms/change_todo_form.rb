# 12月17日　そのまま残す

class ChangeTodoForm
  include ActiveModel::Model
  include ActiveModel::Validations::Callbacks
  include ActiveModel::Attributes
  include StringNormalizer

  attr_accessor :todo, :study_hour

  attribute :subject, :string
  attribute :title, :string
  attribute :description, :string
  attribute :progress, :integer
  attribute :scheduled_study_time, :integer
  attribute :due_date, :datetime
  attribute :importance, :integer
  attribute :star_rating, :integer
  attribute :total_hour, :integer
  attribute :study_type, :integer
  attribute :user_id, :integer
  attribute :study_hour
  attribute :actual_learning_time

  validates :title, presence: true
  validates :description, allow_blank: true, length: { miximum: 1, maximum: 200 }

  delegate :persist?, to: :todo

  def initialize(todo = nil)
    @todo = todo
    @study_hour = @todo.study_hours.build
  end

  def assign_attributes(params = {})
    @params = params
    todo.assign_attributes(todo_params)
    study_hour.assign_attributes(study_hours_params)
  end

  def save
    ActiveRecord::Base.transaction do
      # 保存が失敗した場合は、フォームオブジェクトにエラーを追加
      unless study_hour.save
        self.errors.add(:study_hour, "study_hourの保存に失敗しました")
        raise ActiveRecord::Rollback
      end

      unless todo.save
        self.errors.add(:todo, "todoの保存に失敗しました")
        raise ActiveRecord::Rollback
      end
    end
    # バリデーションエラーがある場合は保存しない
    self.errors.empty?
  end

  private

    def todo_params
      @params.require(:todo).permit(:id, :subject, :title, :description, :progress, :scheduled_study_time, :total_hour, :due_date, :importance,
                                    :star_rating, :study_type, :created_at, :updated_at)
    end

    def study_hours_params
      @params.require(:study_hour).permit(:title, :actual_learning_time, :subject, :study_type, :todo_id)
    end
end
