class Category < ActiveRecord::Base

	has_many :stop_categories
	has_many :categories, through: :stop_categories

end
