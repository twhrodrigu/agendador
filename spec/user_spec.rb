ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
require './api.rb'

describe "User tests" do
  include Rack::Test::Methods

  def app
    AgendaEntrevista::API
  end

  it 'return consultant roles' do
    JSON.stub(:parse).and_return(['BA','DEV'])

    get '/v1/roles'

    expect(last_response.body).to eq(['BA','DEV'].to_json)
  end

end
