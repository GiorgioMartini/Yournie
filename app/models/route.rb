class Route < ActiveRecord::Base
	validates :title, :description,presence:true
	has_many :waypoints
	has_many :stops, through: :waypoints	
	mount_uploader  :route_image, RouteImageUploader

end
