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
    todo = Todo.create_todo_with_rescue(current_user, create_todo_params)
    if todo[:error]
      render json: { error: todo[:error] }, status: :unprocessable_entity
    else
      render json: todo, serializer: TodoSerializer, status: :created
    end
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

    def set_todo
      @todo = current_user.todos.find_by(id: params[:id])
      if @todo.nil?
        render json: { error: "Todoが見つかりません" }, status: :not_found
      end
    end

    def create_todo_params
      params.require(:todo).permit(:id, :subject, :title, :description, :progress, :scheduled_study_time, :total_hour, :due_date, :importance,
                                   :star_rating, :study_type, :created_at, :updated_at, study_hours_attributes: [:title, :actual_learning_time, :subject, :study_type, :todo_id])
    end
end
