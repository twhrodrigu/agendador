require 'grape'
require 'json'

module Agendador

  class OfficeAPI < Grape::API
    version 'v1', using: :path
    format :json

    before do
      header "Access-Control-Allow-Origin", "*"
    end

    desc "Gets all supported offices"
    get :offices do
      @@offices ||= JSON.parse(open('./api/v1/office/offices.json').read)
    end
  end
end