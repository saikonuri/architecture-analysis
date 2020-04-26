class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :email
      t.belongs_to :textbook
      t.timestamps
    end
  end
end
