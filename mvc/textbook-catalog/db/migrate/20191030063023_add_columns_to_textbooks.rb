class AddColumnsToTextbooks < ActiveRecord::Migration[6.0]
  def change
    add_column :textbooks, :name, :string
    add_column :textbooks, :author, :string
  end
end
