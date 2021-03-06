class AuthController < ApplicationController
  # GET /auth/spotify/callback
  def spotify
    begin
      spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
      user = User.from_omniauth(request.env['omniauth.auth'], spotify_user.to_hash)
      session[:user_id] = user.id
      redirect_to "#{ENV["CLIENT_HOST"]}/"
    rescue => exception
      redirect_to "#{ENV["CLIENT_HOST"]}/auth/fail?error=#{exception}"
    end
  end

  def check_session
    current_user ||= User.find_by(id: session[:user_id])
    if current_user 
      render json: {
        :session => session[:user_id],
        :uid => current_user.uid,
        :name => current_user.name,
        :email => current_user.email,
        :image => current_user.image
      }
    else 
      render json: { :error => 'Unauthorized' }, status: :unauthorized
    end
  end

  def destroy
    destroy_session
  end
end
