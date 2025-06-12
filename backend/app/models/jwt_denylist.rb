class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JwtDenylist
  self.table_name = 'jwt_denylists'
end
