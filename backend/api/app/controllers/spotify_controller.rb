class SpotifyController < ApplicationController
  before_action :set_user

  def top_tracks
    render json: { :topTracks => @spotify_user.top_tracks(time_range: 'short_term') }
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      current_user ||= User.find_by(id: session[:user_id])
      if current_user
        @spotify_user = RSpotify::User.new(JSON.parse(current_user.hash_data))
      else 
        render json: { :error => 'Unauthorized' }, status: :unauthorized
      end
    end
end
