require './lib/calendar'
require './lib/user'
require 'webmock/rspec'

describe Calendar do
  it 'format period with timezone' do
    format = Calendar.format('2015-02-25T12:00:00', 1)
    expect(format).to eq('2015-02-25T13:00:00-02:00')
  end

  it 'return people available from google calendar' do
    freeBusyJson = JSON.dump({"calendars" => {
      "tfelix@thoughtworks.com" => {"busy" => []}
    }})

    WebMock.disable_net_connect!(allow_localhost: true)
    WebMock.stub_request(:post, "https://www.googleapis.com/calendar/v3/freeBusy").to_return({:body => freeBusyJson, :status => 200})
    User.stub(:all).and_return([{ :id => 'tfelix@thoughtworks.com' }])

    expect(Calendar.availability('',{:start => '2015-02-25'}, 1)).to eq(["tfelix@thoughtworks.com"])
  end

end
