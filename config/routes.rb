Rails.application.routes.draw do
  get "chat", to: "chat#completion"

  scope :api do
    post "login", to: "session#api_login"
  end
  get "login", to: "session#login"
  get "*path", to: "react#index"
end
