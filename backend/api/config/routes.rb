Rails.application.routes.draw do
  get '/auth/spotify/callback', to: 'auth#spotify'
  get '/auth/session', to: 'auth#check_session'
  delete '/auth/logout', to: 'auth#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
