require './lib/calendar'
require './lib/consultant_service'
require 'webmock/rspec'

describe Calendar do

  it 'format period with timezone' do
    format = Calendar.format('2015-02-25T12:00:00', 1)
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

    alice = Consultant.new(login: 'alice', name: 'Alice', role: 'QA')

    WebMock.disable_net_connect!(allow_localhost: true)
    WebMock.stub_request(:post, 'https://www.googleapis.com/calendar/v3/freeBusy').to_return({:body => freeBusyJson, :status => 200})

    expect(Calendar.availability token: 'access-token-123', start: '2015-02-25T12:00:00', hours: 1, consultants: [alice]).to eq([alice])
  end

end
