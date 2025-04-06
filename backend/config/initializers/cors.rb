# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors
# Rails.env.production? ? 'https://cropbaskets.jp' : 'http://localhost:3000'
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://www.cropbaskets.jp"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true # クッキー・セッションの送受信を許可
  end
end
