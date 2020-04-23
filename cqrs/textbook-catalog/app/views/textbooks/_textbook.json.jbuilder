json.extract! textbook, :id, :name, :author, :created_at, :updated_at
json.url textbook_url(textbook, format: :json)
