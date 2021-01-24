Rails.application.routes.draw do
  root to: "darkroom#index"
  resources :darkroom

end
