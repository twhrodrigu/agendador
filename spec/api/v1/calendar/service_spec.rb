require 'webmock/rspec'

require './api/v1/calendar/service'
require './api/v1/consultants/service'

describe 'calendar service' do

  it 'format period with timezone' do
    format = API::V1::Calendar::Service.format('2015-02-25T12:00:00', 1)
    expect(format).to eq('2015-02-25T13:00:00+00:00')
  end

  it 'return people available from google calendar' do
    freeBusyJson = JSON.dump(
      {
        'calendars' => {
          'alice@thoughtworks.com' => {'busy' => []}
        }
      }
    )

    alice = API::V1::Consultants::Consultant.new(login: 'alice', name: 'Alice', role: 'QA')

    WebMock.stub_request(:post, 'https://www.googleapis.com/calendar/v3/freeBusy').to_return({:body => freeBusyJson, :status => 200})

    expect(API::V1::Calendar::Service.availability token: 'access-token-123', start: '2015-02-25T12:00:00', hours: 1, consultants: [alice]).to eq([alice])
  end

end