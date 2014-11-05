class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.string :title
      t.string :description
      t.string :route_image
      t.timestamps
    end
  end
end
