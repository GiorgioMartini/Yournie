Rails.application.routes.draw do
  resources :votes

  #devise_for :users
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :stops

  get 'pages/home'

  resources :routes
  resources :waypoints

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
   root 'routes#index'


 devise_scope :user do
  get 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_facebook_session
  end



end
