require './lib/consultant_service.rb'

describe 'Consultant Service' do

  it 'should retrieve all supported offices' do
    expect(ConsultantService.offices).to contain_exactly("São Paulo", "Porto Alegre", "Recife", "Belo Horizonte")
  end

  it 'should retrieve all supported roles' do
    expect(ConsultantService.roles).to contain_exactly("BA", "Dev", "QA", "UI Dev", "XD", "PM", "DevOps")
  end

  it 'should retrieve first page of consultants by staffing office' do
    alice = Consultant.new(login: 'alice', name: 'Alice', role: 'Dev')
    bob = Consultant.new(login: 'bob', name: 'Bob', role: 'QA')

    json = [
      {
        'loginName' => alice.login,
        'preferredName' => alice.name,
        'role' => {'name'=> alice.role}
      },
      {
        'loginName' => bob.login,
        'preferredName' => bob.name,
        'role' => {'name' => bob.role}
      }
    ].to_json

    office = 'Porto Alegre'

    WebMock.stub_request(:get, "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{office}").
       with(:headers => {
        'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
        'Content-Type'=>'application/json',
        'Host'=>'jigsaw.thoughtworks.com',
        'X-Service-Version'=>'2'
      }).to_return(:status => 200, :body => json, :headers => {})

    expect((ConsultantService.consultants_by_staffing_office office)).to contain_exactly(alice, bob)
  end
end