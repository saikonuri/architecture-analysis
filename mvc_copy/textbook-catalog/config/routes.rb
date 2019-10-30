Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :universities, only: [:index, :show, :create, :update, :destroy, :new, :edit]

  resources :departments, only: [:index, :show, :create, :update, :destroy, :new, :edit]

  resources :courses, only: [:index, :show, :create, :update, :destroy, :new, :edit]

  resources :textbooks, only: [:index, :show, :create, :update, :destroy, :new, :edit]
end
