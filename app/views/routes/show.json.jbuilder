json.extract! @route, :id, :title, :description, :created_at, :updated_at

json.stops @route.stops, :name, :description
