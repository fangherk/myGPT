Rails.application.routes.draw do
  root  "chat#index"
  get "chat", to: "chat#completion"
end
