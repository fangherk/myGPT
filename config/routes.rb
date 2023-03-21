Rails.application.routes.draw do
  get "chat", to: "chat#completion"
end
