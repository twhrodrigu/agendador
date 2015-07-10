ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
include Rack::Test::Methods

require './api/v1/offices/resource'

describe 'offices api' do

  def app
    API::V1::Offices::Resource
  end

  it 'should get all supported offices' do
    get '/v1/offices'
    expect(last_response.body).to eq(['São Paulo', 'Porto Alegre', 'Recife', 'Belo Horizonte'].to_json)
  end
end