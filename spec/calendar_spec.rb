require './lib/calendar'
require './lib/user'
require 'webmock/rspec'

describe Calendar do
  it 'format period with timezone' do
    format = Calendar.format('2015-02-25T12:00:00', 1)
    expect(format).to eq('2015-02-25T13:00:00+00:00')
  end

  it 'return people available from google calendar' do
    freeBusyJson = JSON.dump(
      {
        "calendars" => {
          "aconsultant@thoughtworks.com" => {"busy" => []}
        }
      }
    )

    WebMock.disable_net_connect!(allow_localhost: true)
    WebMock.stub_request(:post, "https://www.googleapis.com/calendar/v3/freeBusy").to_return({:body => freeBusyJson, :status => 200})
    allow(User).to receive(:all).and_return([{ id: "aconsultant@thoughtworks.com", name: 'Consultant A' }])

    expect(Calendar.availability('',{:start => '2015-02-25T12:00:00', :role => 'Dev', :office => 'Porto Alegre'}, 1)).to eq([{id: "aconsultant@thoughtworks.com", name:"Consultant A"}])
  end

  it 'should return an array of people with name and email' do
    consultants = [
      {id: "aconsultant@thoughtworks.com", name: "Consultant A"},
      {id: "bconsultant@thoughtworks.com", name: "Consultant B"}
    ]

    emails = ['aconsultant@thoughtworks.com']

    filteredConsultants = Calendar.filterConsultants(consultants, emails)
    expect(filteredConsultants).to eq([{id: "aconsultant@thoughtworks.com", name: "Consultant A"}])
  end

end
