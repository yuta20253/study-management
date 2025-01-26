Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"
      namespace :user do
        resource :confirmations, only: [:update]
      end

      namespace :current do
        get "home" => "homes#index"
        resource :user, only: [:show, :edit, :update] do
          resource :relationships, only: [:show, :create, :destroy]
          get "followings" => "relationships#followings", as: "followings"
          get "followers" => "relationships#followers", as: "followers"
          get "mutual_follow", on: :collection
        end
        resources :follows
        resources :todos, only: [:index, :show, :create, :edit, :update, :destroy]
        resources :desired_schools, only: [:index, :new, :create, :destroy]
        resources :management
        resources :schools, params: :school_id, only: :show do
          resources :details, only: :show
        end
        resources :search_result, only: :index
        namespace :desired_schools do
          namespace :search do
            resources :option
            resources :prefecture_searches
            resources :map
          end
        end
        resources :rooms, only: [:index, :show, :create] do
          resources :messages, only: [:create]
        end
      end
    end
  end
end
