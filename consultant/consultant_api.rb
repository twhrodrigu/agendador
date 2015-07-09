require 'grape'
require 'json'
require './consultant/consultant_service'

module Agendador

  class ConsultantAPI < Grape::API
    version 'v1', using: :path
    format :json

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