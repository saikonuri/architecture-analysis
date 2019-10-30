class AddColumnsToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :name, :string
    add_column :courses, :mnemonic, :string
  end
end
