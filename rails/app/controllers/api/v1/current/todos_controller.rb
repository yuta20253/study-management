class Api::V1::Current::TodosController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_todo, only: [:show, :destroy]

  include Pagination

  def index
    todos = current_user.todos.page(params[:page] || 1).per(5).includes([:study_hours])
    render json: todos, meta: pagination(todos), adapter: :json
  end

  def show
    render json: @todo, serializer: TodoSerializer
  end

  def create
    # 今これでtodoの子（userから見たら孫）が自動で作成されている
    todo = current_user.todos.create!(create_todo_params)
    render json: todo, serializer: TodoSerializer, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def edit
    change_todo_form = ChangeTodoForm.new(Todo.find(params[:id]))
    render json: change_todo_form.todo
  end

  def update
    change_todo_form = ChangeTodoForm.new(Todo.find(params[:id]))
    change_todo_form.assign_attributes(params[:form])
    if change_todo_form.todo.save
      render json: change_todo_form.todo
    else
      Rails.logger.debug "保存に失敗しました。"
      render json: { error: change_todo_form.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy!
    head :no_content
  end

  private

    # Set the todo for the show, destroy actions
    def set_todo
      @todo = current_user.todos.find_by(id: params[:id])
      Rails.logger.debug "set_todoです"
      if @todo.nil?
        render json: { error: "Todo not found" }, status: :not_found
      end
    end

    def create_todo_params
      params.require(:todo).permit(:id, :subject, :title, :description, :progress, :scheduled_study_time, :total_hour, :due_date, :importance,
                                   :star_rating, :study_type, :created_at, :updated_at, study_hours_attributes: [:title, :actual_learning_time, :subject, :study_type, :todo_id])
    end
end
