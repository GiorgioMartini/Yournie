json.extract! @route, :id, :title, :description, :created_at, :updated_at

json.stops @route.stops do |stop| 
	json.name           stop.name
	json.description    stop.description
	json.stop_lat       stop.stop_lat
	json.stop_long      stop.stop_long
	json.id             stop.id


	json.categories stop.categories.map{|c|c.name} 

end

