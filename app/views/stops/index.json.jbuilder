json.array!(@stops) do |stop|
  json.extract! stop, :id, :name, :description, :stop_image
  json.url stop_url(stop, format: :json)
end
