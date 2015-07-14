require 'webmock/rspec'

require './api/v1/root'

module API
  module V1
    describe 'calendar service' do

      before(:all) do
        @token = 'access-token-123'
        @alice = Consultants::Consultant.new login: 'alice', name: 'Alice', role: 'QA'
        @bob = Consultants::Consultant.new login: 'bob', name: 'Bob', role: 'Dev'
        @eve = Consultants::Consultant.new login: 'eve', name: 'Eve', role: 'BA'
      end

      it 'format period with timezone' do
        format = Calendar::Service.format('2015-02-25T12:00:00', 1)
        expect(format).to eq('2015-02-25T13:00:00+00:00')
      end

      it 'should return only available consultants' do
        calendar_response = JSON.dump(
          {
            'calendars' => {
              @alice.email => {'busy' => [{'start'=>'2015-02-25T12:00:00Z', 'end'=>'2015-02-25T14:00:00Z'}]},
              @bob.email   => {'busy' => []},
              @eve.email   => {'busy' => [{'start'=>'2015-02-25T10:00:00Z', 'end'=>'2015-02-25T12:30:00Z'}]}
            }
          }
        )

        WebMock.stub_request(:post, 'https://www.googleapis.com/calendar/v3/freeBusy').to_return({:body => calendar_response, :status => 200})
        available = Calendar::Service.availability token: @token, start: '2015-02-25T12:00:00', hours: 1, consultants: [@alice, @bob, @eve]
        expect(available).to eq([@bob])
      end
      
      it 'should return empty list if no consultants are available' do
        calendar_response = JSON.dump(
          {
            'calendars' => {
              @alice.email => {'busy' => [{'start'=>'2015-02-25T12:00:00Z', 'end'=>'2015-02-25T14:00:00Z'}]},
              @bob.email   => {'busy' => [{'start'=>'2015-02-25T12:30:00Z', 'end'=>'2015-02-25T13:00:00Z'}, {'start'=>'2015-02-25T13:15:00Z', 'end'=>'2015-02-25T13:30:00Z'}]},
              @eve.email   => {'busy' => [{'start'=>'2015-02-25T10:00:00Z', 'end'=>'2015-02-25T12:30:00Z'}]}
            }
          }
        )

        WebMock.stub_request(:post, 'https://www.googleapis.com/calendar/v3/freeBusy').to_return({:body => calendar_response, :status => 200})
        available = Calendar::Service.availability token: @token, start: '2015-02-25T12:00:00', hours: 3, consultants: [@alice, @bob, @eve]
        expect(available).to eq([])
      end
    end
  end
end