class Course < ApplicationRecord
  belongs_to :department
  has_many_belongs_to_many :textbooks
end
