class PagesController < ApplicationController
  
  def home
  @routes = Route.all
  end

  def about
  
  end

end
