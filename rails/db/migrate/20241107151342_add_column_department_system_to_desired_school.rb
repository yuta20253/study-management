class AddColumnDepartmentSystemToDesiredSchool < ActiveRecord::Migration[7.0]
  def change
    add_column :desired_schools, :department_system, :string, null: false, comment: "学科区分"
  end
end
