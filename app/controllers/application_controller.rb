class ApplicationController < ActionController::Base
  before_action :get_authenticated_user

  attr :current_user

  def get_authenticated_user
    if (user = User.find_by(id: session[:user_id]))
      @current_user = user
    end
  end
end
