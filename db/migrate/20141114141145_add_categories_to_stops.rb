class AddCategoriesToStops < ActiveRecord::Migration
  def change
  	add_column :stops, :stop_category, :string
  end
end
