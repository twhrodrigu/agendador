require 'grape'
require 'json'

module Agendador

  class RoleAPI < Grape::API
    version 'v1', using: :path
    format :json

    before do
      header "Access-Control-Allow-Origin", "*"
    end

    desc "Gets all supported roles"
    get :roles do
      @@roles ||= JSON.parse(open('./api/v1/roles/roles.json').read)
    end
  end
end