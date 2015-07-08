require './lib/consultant_service.rb'


describe 'offices and roles' do
  it 'should retrieve all supported offices' do
    expect(ConsultantService.offices).to contain_exactly("São Paulo", "Porto Alegre", "Recife", "Belo Horizonte")
  end

  it 'should retrieve all supported roles' do
    expect(ConsultantService.roles).to contain_exactly("BA", "Dev", "QA", "UI Dev", "XD", "PM", "DevOps")
  end
end

describe 'consultants by staffing office' do

  before(:all) do
    @alice = Consultant.new(login: 'alice', name: 'Alice', role: 'Dev')
    @bob = Consultant.new(login: 'bob', name: 'Bob', role: 'QA')
    @eve = Consultant.new(login: 'eve', name: 'Eve', role: 'BA')

    @office = 'Belo Horizonte'

    @json_first_page = [
      {
        'loginName' => @alice.login,
        'preferredName' => @alice.name,
        'role' => {'name'=> @alice.role}
      },
      {
        'loginName' => @bob.login,
        'preferredName' => @bob.name,
        'role' => {'name' => @bob.role}
      }
    ].to_json

    @json_second_page = [
      {
        'loginName' => @eve.login,
        'preferredName' => @eve.name,
        'role' => {'name'=> @eve.role}
      }
    ].to_json
  end

  it 'should retrieve first page of consultants by staffing office' do
    WebMock.stub_request(:get, "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{@office}&page=1").
       with(:headers => {
        'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
        'Content-Type'=>'application/json',
        'Host'=>'jigsaw.thoughtworks.com',
        'X-Service-Version'=>'2'
      }).to_return(:status => 200, :body => @json_first_page, :headers => {
        'X-Total-Pages'=>'1'
      })

    expect((ConsultantService.consultants_by_staffing_office @office)).to contain_exactly(@alice, @bob)
  end

  it 'should retrieve all consultants by staffing office using pagination' do
    WebMock.stub_request(:get, "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{@office}&page=1").
       with(:headers => {
        'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
        'Content-Type'=>'application/json',
        'Host'=>'jigsaw.thoughtworks.com',
        'X-Service-Version'=>'2'
      }).to_return(:status => 200, :body => @json_first_page, :headers => {
        'X-Total-Pages'=>'2'
      })

    WebMock.stub_request(:get, "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{@office}&page=2").
       with(:headers => {
        'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
        'Content-Type'=>'application/json',
        'Host'=>'jigsaw.thoughtworks.com',
        'X-Service-Version'=>'2'
      }).to_return(:status => 200, :body => @json_second_page, :headers => {
        'X-Total-Pages'=>'2'
      })

    expect((ConsultantService.consultants_by_staffing_office @office)).to contain_exactly(@alice, @bob, @eve)
  end
end