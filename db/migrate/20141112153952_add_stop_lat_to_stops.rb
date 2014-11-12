class AddStopLatToStops < ActiveRecord::Migration
  def change
  	    add_column :stops, :stop_lat, :float
  	    add_column :stops, :stop_long, :float

  end
end
