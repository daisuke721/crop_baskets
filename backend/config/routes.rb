Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do
      resources :crops, only: [:index, :show]
      resources :commodity_crops, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get :my_list
        end
      end
      resources :cart_items, only: [:index, :create, :destroy]
      resources :orders, only: [:index, :new, :create, :show]
      # 簡単出品用のルーティング
      resources :simple_listings, only: [:create]
      # 受け取りポイントのルーティング
      resources :receiving_points, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get :my_list
        end
      end
    end
  end

  # deviseのルーティング
  devise_for :consumers,
              path: 'api/v1/consumers',
              defaults: { format: :json },
              controllers: {
                sessions: 'api/v1/consumers/sessions',
                registrations: 'api/v1/consumers/registrations'
              }

  devise_for :producers,
              path: 'api/v1/producers',
              defaults: { format: :json },
              controllers: {
                sessions: 'api/v1/producers/sessions',
                registrations: 'api/v1/producers/registrations'
              }
end
