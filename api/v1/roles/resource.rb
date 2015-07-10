require 'grape'
require 'json'

module API
  module V1
    module Roles
      class Resource < Grape::API
        
        include API::V1::Defaults

        desc "Gets all supported roles"
        get :roles do
          @@roles ||= JSON.parse(open('./api/v1/roles/roles.json').read)
        end

      end
    end
  end
end