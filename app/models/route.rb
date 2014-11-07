class Route < ActiveRecord::Base
	has_many :stops
	mount_uploader  :route_image, RouteImageUploader

end
