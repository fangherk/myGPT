Rails.application.routes.draw do
  root "react#index"

  scope :api do
    post "login", to: "session#api_login"
    post "logout", to: "session#api_logout"
    post "signup", to: "session#api_signup"
    post "chat", to: "chat#completion"
  end

  get "login", to: "session#login"
  get "*path", to: "react#index"
end
