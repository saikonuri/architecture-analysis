class CreateCoursesTextbooks < ActiveRecord::Migration[6.0]
  def change
    create_table :courses_textbooks do |t|
      t.references :course, null: false, foreign_key: true
      t.references :textbook, null: false, foreign_key: true

      t.timestamps
    end
  end
end
