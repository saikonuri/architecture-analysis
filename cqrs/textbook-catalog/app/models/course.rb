class Course < ApplicationRecord
  belongs_to :department
  has_many :courses_textbooks
  has_many :textbooks, through: :courses_textbooks

  def self.search(search)
    # Title is for the above case, the OP incorrectly had 'name'
    where("name LIKE ?", "%#{search}%")
  end
end
