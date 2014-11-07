class AddStopIdToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :stop_id, :integer
  end
end
