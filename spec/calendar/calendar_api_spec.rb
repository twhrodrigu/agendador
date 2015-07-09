ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
include Rack::Test::Methods

require './calendar/calendar_api'
require './consultant/consultant'

describe 'calendar api' do

  def app
    Agendador::CalendarAPI
  end

  def to_json(consultant)
    return {
      'loginName' => consultant.login,
      'preferredName' => consultant.name,
      'role' => {'name'=> consultant.role}
    }
  end

  it 'should get available consultants' do
    alice = Consultant.new(login: 'alice', name: 'Alice', role: 'Dev')
    bob = Consultant.new(login: 'bob', name: 'Bob', role: 'Dev')
    eve = Consultant.new(login: 'eve', name: 'Eve', role: 'BA')

    token = 'access-token-123'
    start = '2015-02-25T12:00:00'
    role = 'Dev'
    office = 'Belo Horizonte'

    request_headers = {
      'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
      'Content-Type'=>'application/json',
      'Host'=>'jigsaw.thoughtworks.com',
      'X-Service-Version'=>'2'
    }

    jigsaw_response = [to_json(alice), to_json(bob), to_json(eve)].to_json
    WebMock.stub_request(:get, "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{office}&page=1").
      with(:headers => request_headers).to_return(:status => 200, :body => jigsaw_response, :headers => {
        'X-Total-Pages'=>'1'
    })

    calendar_response = JSON.dump(
      {
        'calendars' => {
          alice.email => {'busy' => []}
        }
      }
    )
    WebMock.stub_request(:post, 'https://www.googleapis.com/calendar/v3/freeBusy').to_return({:body => calendar_response, :status => 200})

    get "/v1/calendar/available?token=#{token}&start=#{start}&role=#{role}&office=#{office}"
    expect(last_response.body).to eq([{login: alice.login, email: alice.email, name: alice.name, role: alice.role}].to_json)
  end

end