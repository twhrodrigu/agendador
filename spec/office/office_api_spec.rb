ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
include Rack::Test::Methods

require './office/office_api'

describe 'office api' do

  def app
    Agendador::OfficeAPI
  end

  it 'should get all supported offices' do
    get '/v1/offices'
    expect(last_response.body).to eq(['São Paulo', 'Porto Alegre', 'Recife', 'Belo Horizonte'].to_json)
  end
end