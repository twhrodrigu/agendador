ENV['RACK_ENV'] = 'development'

require 'webmock/rspec'
require 'rack/test'
include Rack::Test::Methods

require './api/v1/root'

module API
  module V1
    describe 'calendar api' do

      def app
        Calendar::Resource
      end

      before(:all) do
        @request_headers = {
          'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
          'Content-Type'=>'application/json',
          'Host'=>'jigsaw.thoughtworks.com',
          'X-Service-Version'=>'2'
        }

        token = 'access-token-123'
      end

      def to_json(consultant)
        return {
          'employeeId' => consultant.id,
          'loginName' => consultant.login,
          'preferredName' => consultant.name,
          'role' => {'name'=> consultant.role}
        }
      end

      it 'should get available consultants' do
        alice = Consultants::Consultant.new(id: 1, login: 'alice', name: 'Alice', role: 'Dev')
        bob = Consultants::Consultant.new(id: 2, login: 'bob', name: 'Bob', role: 'Dev')
        eve = Consultants::Consultant.new(id: 3, login: 'eve', name: 'Eve', role: 'BA')

        start = '2015-02-25T12:00:00'
        role = 'Dev'
        office = 'Recife'

        jigsaw_response = [to_json(alice), to_json(bob), to_json(eve)].to_json
        WebMock.stub_request(:get, Consultants::Service::JIGSAW_URL)
               .with(query: { 'staffing_office' => office, 'page' => 1 })
               .to_return(status: 200, body: jigsaw_response, headers: { 'X-Total-Pages'=>'1' })

        calendar_response = JSON.dump(
          {
            'calendars' => {
              alice.email => {'busy' => []}
            }
          }
        )
        WebMock.stub_request(:post, 'https://www.googleapis.com/calendar/v3/freeBusy').to_return({:body => calendar_response, :status => 200})

        get '/v1/calendar/available', { token: @token, start: start, role: role, office: office }
        expect(last_response.body).to eq([{id: 1, login: alice.login, email: alice.email, name: alice.name, role: alice.role, p2: nil, p3: nil}].to_json)
      end

      it 'should return empty if no consultants match criteria' do
        start = '2015-02-25T12:00:00'
        role = 'Dev'
        office = 'Recife'

        jigsaw_response = [].to_json
        WebMock.stub_request(:get, Consultants::Service::JIGSAW_URL)
               .with(query: { 'staffing_office' => office, 'page' => 1 })
               .to_return(status: 200, body: jigsaw_response, headers: { 'X-Total-Pages'=>'1' })

        get "/v1/calendar/available?token=#{@token}&start=#{start}&role=#{role}&office=#{office}"
        expect(last_response.body).to eq([].to_json)
      end

    end
  end
end
