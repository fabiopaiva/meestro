Rails.application.routes.draw do
  get '/auth/spotify/callback', to: 'auth#spotify'
  get '/auth/session', to: 'auth#check_session'
  delete '/auth/logout', to: 'auth#destroy'
  get '/spotify/top-tracks', to: 'spotify#top_tracks'
  get '/spotify/top-artists', to: 'spotify#top_artists'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
