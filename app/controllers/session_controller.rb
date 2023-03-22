
class SessionController < ApplicationController
  def login
    if current_user
      return redirect_to "/"
    end
    render template: "react/index"
  end

  def api_login
    permitted_params = params.permit(:username, :password)
    user = User.find_by(username: permitted_params[:username])
    return head :unauthorized if !user

    if user.authenticate(permitted_params[:password])
      session[:user_id] = user.id
      return render json: {}
    else
      return head :unauthorized
    end
  end
end