class AddColumnsToUniversities < ActiveRecord::Migration[6.0]
  def change
    add_column :universities, :name, :string
  end
end
