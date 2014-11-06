class CreateStops < ActiveRecord::Migration
  def change
    create_table :stops do |t|
      t.string :name
      t.string :description
      t.string :stop_image

      t.timestamps
    end
  end
end
