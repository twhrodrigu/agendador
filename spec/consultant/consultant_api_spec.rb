ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
include Rack::Test::Methods

require './consultant/consultant_api'

describe 'consultant api' do

  def app
    Agendador::ConsultantAPI
  end

  it 'should get all supported roles' do
    get '/v1/roles'
    expect(last_response.body).to eq(['BA', 'Dev', 'QA', 'UI Dev', 'XD', 'PM', 'DevOps'].to_json)
  end

  it 'should get all supported offices' do
    get '/v1/offices'
    expect(last_response.body).to eq(['São Paulo', 'Porto Alegre', 'Recife', 'Belo Horizonte'].to_json)
  end
end