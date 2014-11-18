class CreateStopCategories < ActiveRecord::Migration
  def change
    create_table :stop_categories do |t|

      t.integer :stop_id
      t.integer :category_id

      t.timestamps
    end
  end
end
