class Stop < ActiveRecord::Base

	mount_uploader  :stop_image, StopImageUploader
	has_many :waypoints

end
