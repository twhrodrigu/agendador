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

  it 'return consultant offices' do
    JSON.stub(:parse).and_return(['Porto Alegre','São Paulo'])

    get '/v1/offices'

    expect(last_response.body).to eq(['Porto Alegre','São Paulo'].to_json)
  end

  it 'return consultants' do
    json = [
      {
        "role" => {"name"=>"Dev"},
        "loginName" => "aconsultant"
      },
      {
        "role" => {"name"=>"Dev"},
        "loginName" => "bconsultant"
      }
    ].to_json

    WebMock.stub_request(:get, "https://jigsaw.thoughtworks.com/api/people?page=1&staffing_office=Porto%20Alegre").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization'=>'e9c735405f523e81f2f2884ea116411f', 'Content-Type'=>'application/json', 'Host'=>'jigsaw.thoughtworks.com', 'User-Agent'=>'Ruby', 'X-Service-Version'=>'2'}).
         to_return(:status => 200, :body => json, :headers => {})

    get '/v1/consultants', params = {:office => "Porto Alegre", :role => "Dev"}

    expect(last_response.body).to eq([{:id => "aconsultant@thoughtworks.com"},{:id => "bconsultant@thoughtworks.com"}].to_json)
  end

end
