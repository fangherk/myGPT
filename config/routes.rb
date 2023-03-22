Rails.application.routes.draw do
  root to: "react#index"
  get "chat", to: "chat#completion"

  scope :api do
    post "login", to: "session#api_login"
    post "signup", to: "session#api_signup"
  end
  get "login", to: "session#login"
  get "*path", to: "react#index"
end
