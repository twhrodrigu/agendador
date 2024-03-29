require 'grape'
require 'json'
require_relative '../defaults'

module API
  module V1
    module Offices
      class Resource < Grape::API
        include API::V1::Defaults

        JSON_FILE = File.expand_path('../offices.json', __FILE__)

        desc "Gets all supported offices"
        get :offices do
          @@offices ||= JSON.parse(open(JSON_FILE).read)
        end
      end
    end
  end
end
