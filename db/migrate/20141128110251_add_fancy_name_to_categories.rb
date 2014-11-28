class AddFancyNameToCategories < ActiveRecord::Migration
  def change

    add_column :categories, :fancy_name, :string

  end
end
