class WaypointsController < ApplicationController


	def create
		@waypoint = Waypoint.create(waypoint_params)
		
		redirect_to @waypoint.route

	end


	private
  

    # Never trust parameters from the scary internet, only allow the white list through.
    def waypoint_params
      params.require(:waypoint).permit(:stop_id, :route_id)
    end

end

