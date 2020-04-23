class Department < ApplicationRecord
  has_many :courses
  belongs_to :university

  def self.search(search)
    # Title is for the above case, the OP incorrectly had 'name'
    where("abbreviation LIKE ?", "%#{search}%")
  end
end
