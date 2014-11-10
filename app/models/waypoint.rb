class Waypoint < ActiveRecord::Base

belongs_to :route
belongs_to :stop
	#validates_uniqueness_of :stop_id, :scope => :route_id

end
