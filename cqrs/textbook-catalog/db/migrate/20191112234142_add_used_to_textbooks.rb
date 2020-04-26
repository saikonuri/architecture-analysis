class AddUsedToTextbooks < ActiveRecord::Migration[6.0]
  def change
    add_column :textbooks, :used, :string
  end
end
