class AddColumnsToDepartments < ActiveRecord::Migration[6.0]
  def change
    add_column :departments, :name, :string
  end
end
