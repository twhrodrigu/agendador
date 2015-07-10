ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
include Rack::Test::Methods

require './api/v1/roles/resource'

describe 'roles api' do

  def app
    API::V1::Roles::Resource
  end

  it 'should get all supported roles' do
    get '/v1/roles'
    expect(last_response.body).to eq(['BA', 'Dev', 'QA', 'UI Dev', 'XD', 'PM', 'DevOps'].to_json)
  end
end