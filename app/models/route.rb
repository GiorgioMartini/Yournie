class Route < ActiveRecord::Base		
	validates :description, length: { maximum: 140 }
	validates :title, :description,presence:true
	has_many :waypoints
	has_many :stops, through: :waypoints	
	has_many :votes
	mount_uploader  :route_image, RouteImageUploader


def score
	votes.sum(:score)
end

def positive_votes
	votes.where(score: 1).count
end

def negative_votes
	votes.where(score: -1).count
end


end
