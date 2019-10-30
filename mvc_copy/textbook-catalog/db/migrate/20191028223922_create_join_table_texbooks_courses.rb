class CreateJoinTableTexbooksCourses < ActiveRecord::Migration[6.0]
  def change
    create_join_table :textbooks, :courses do |t|
      # t.index [:textbook_id, :course_id]
      # t.index [:course_id, :textbook_id]
    end
  end
end
