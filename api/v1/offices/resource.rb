require 'grape'
require 'json'

module API
  module V1
    module Offices
      class Resource < Grape::API

        include API::V1::Defaults

        desc "Gets all supported offices"
        get :offices do
          @@offices ||= JSON.parse(open('./api/v1/offices/offices.json').read)
        end
        
      end   
    end
  end
end