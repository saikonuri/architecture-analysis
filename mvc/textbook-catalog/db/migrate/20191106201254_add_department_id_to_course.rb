class AddDepartmentIdToCourse < ActiveRecord::Migration[6.0]
  def change
    add_reference :courses, :department, null: true, foreign_key: true
  end
end
