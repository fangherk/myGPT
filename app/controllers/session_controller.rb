
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

  def api_logout
    session[:user_id] = nil
    head :ok
  end

  def api_signup
    permitted_params = params.permit(:username, :password)
    user = User.find_by(username: permitted_params[:username])
    if user
      return render json: { error: "Username already exists" }
    end

    user = User.new(username: permitted_params[:username], password: permitted_params[:password])
    if user.save
      session[:user_id] = user.id
      return render json: {}
    end
    return render json: { errors: user.error.full_messages }
  end
end