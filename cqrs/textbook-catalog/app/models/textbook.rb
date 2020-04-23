class Textbook < ApplicationRecord
  has_many :orders
  has_many :courses_textbooks
  has_many :courses, through: :courses_textbooks
end
