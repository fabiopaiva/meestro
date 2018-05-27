RestClient.log = 'stdout'

class SpotifyController < ApplicationController
  before_action :set_user

  def top_tracks
    begin
      render json: @spotify_user.top_tracks(time_range: 'short_term')
    rescue => e
      common_error(e)
    end
  end

  def top_artists
    begin
      render json: @spotify_user.top_artists
    rescue => e
      common_error(e)
    end
  end

  def recomendations
    begin
      information = request.raw_post
      data_parsed = JSON.parse(information)

      recommendations = RSpotify::Recommendations.generate(seed_genres: data_parsed["genres"])
      recommendations = RSpotify::Recommendations.generate(seed_tracks: data_parsed["tracks"])
      recommendations = RSpotify::Recommendations.generate(seed_artists: data_parsed["artists"])
      tracks = recommendations.tracks
      render json: tracks
    rescue => e
      common_error(e)
    end
  end

  def create_playlist
    begin
      information = request.raw_post
      data_parsed = JSON.parse(information)
      playlist = @spotify_user.create_playlist!('Meestro', public: false)
      playlist.add_tracks!(data_parsed["tracks"])
      render json: playlist
    rescue => e
      common_error(e)
    end
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

    def common_error(e)
      if e.message == '403 Forbidden'
        render json: { :error => 'Unauthorized' }, status: :unauthorized
        destroy_session
      else
        render json: { :error => e }, status: 400
      end
    end
end
