Rails.application.routes.draw do
  resources :courses_textbooks
  resources :orders
  resources :textbooks
  resources :courses
  resources :departments
  resources :universities
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
