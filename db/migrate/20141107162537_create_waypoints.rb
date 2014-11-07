class CreateWaypoints < ActiveRecord::Migration
  def change
    create_table :waypoints do |t|
      t.integer :route_id
      t.integer :stop_id

      t.timestamps
    end
  end
end
