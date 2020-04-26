class AddAbbreviationToDepartments < ActiveRecord::Migration[6.0]
  def change
    add_column :departments, :abbreviation, :string
  end
end
