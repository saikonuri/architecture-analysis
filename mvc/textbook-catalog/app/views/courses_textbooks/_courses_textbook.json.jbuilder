json.extract! courses_textbook, :id, :course_id, :textbook_id, :created_at, :updated_at
json.url courses_textbook_url(courses_textbook, format: :json)
