require 'grape'
require './consultant/consultant_service'
require 'json'

module Agendador

  class ConsultantAPI < Grape::API
    version 'v1', using: :path
    format :json

    helpers do
      def permitted_params
          @permitted_params ||= declared(params, include_missing: false)
      end
    end

    before do
      header "Access-Control-Allow-Origin", "*"
    end

    desc "Gets all supported offices"
    get :offices do
      ConsultantService.offices
    end

    desc "Gets all supported roles"
    get :roles do
      ConsultantService.roles
    end

  end
end