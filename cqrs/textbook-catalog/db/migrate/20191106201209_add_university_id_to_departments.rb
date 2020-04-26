class AddUniversityIdToDepartments < ActiveRecord::Migration[6.0]
  def change
    add_reference :departments, :university, null: true, foreign_key: true
  end
end
