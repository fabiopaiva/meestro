class ApplicationController < ActionController::API
    def destroy_session
        session.delete(:user_id)
        session.clear
        reset_session
    end
end
