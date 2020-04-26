class AddTextbookIdToOrder < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :textbook, null: true, foreign_key: true
  end
end
