class Course < ApplicationRecord
  belongs_to :department
  has_many :courses_textbooks
  has_many :textbooks, through: :courses_textbooks
end
