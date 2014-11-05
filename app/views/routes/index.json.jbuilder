json.array!(@routes) do |route|
  json.extract! route, :id, :title, :description
  json.url route_url(route, format: :json)
end
