class Stop < ActiveRecord::Base
  validates :description, length: { maximum: 140 }

  #Image Uploader
  mount_uploader  :stop_image, StopImageUploader
  
  #Relationship with stops and waypoints
  has_many :waypoints
  has_many :routes, through: :waypoints

  # Relationship with categories
  has_many :stop_categories
  has_many :categories, through: :stop_categories 
end
