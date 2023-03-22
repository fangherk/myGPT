class ReactController < ApplicationController
  before_action :verify_authenticated_user

  def verify_authenticated_user
    if !current_user
      return redirect_to "/login"
    end
  end

  def index
  end
end