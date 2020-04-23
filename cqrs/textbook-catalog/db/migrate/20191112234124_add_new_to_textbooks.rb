class AddNewToTextbooks < ActiveRecord::Migration[6.0]
  def change
    add_column :textbooks, :new, :string
  end
end
