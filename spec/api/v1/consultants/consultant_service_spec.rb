require './api/v1/consultants/consultant_service'

describe 'consultants by staffing office and role' do

  def to_json(consultant)
    return {
      'loginName' => consultant.login,
      'preferredName' => consultant.name,
      'role' => {'name'=> consultant.role}
    }
  end

  def jigsaw_url(office, page)
    return "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{office}&page=#{page}"
  end

  before(:all) do
    @alice = Consultant.new(login: 'alice', name: 'Alice', role: 'QA')
    @bob = Consultant.new(login: 'bob', name: 'Bob', role: 'Dev')
    @eve = Consultant.new(login: 'eve', name: 'Eve', role: 'BA')

    @office = 'Belo Horizonte'

    @request_headers = {
      'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
      'Content-Type'=>'application/json',
      'Host'=>'jigsaw.thoughtworks.com',
      'X-Service-Version'=>'2'
    }
  end

  it 'should retrieve first page of consultants by staffing office' do
    json_first_page = [to_json(@alice), to_json(@bob)].to_json
    WebMock.stub_request(:get, jigsaw_url(@office, 1)).
      with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => {
        'X-Total-Pages'=>'1'
    })

    expect((ConsultantService.consultants staffing_office: @office)).to contain_exactly(@alice, @bob)
  end

  it 'should retrieve all consultants by staffing office using pagination' do
    response_headers = {
      'X-Total-Pages'=>'2'
    }

    json_first_page = [to_json(@alice), to_json(@bob)].to_json
    WebMock.stub_request(:get, jigsaw_url(@office, 1)).
      with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => response_headers)

    json_second_page = [to_json(@eve)].to_json
    WebMock.stub_request(:get, jigsaw_url(@office, 2)).
      with(:headers => @request_headers).to_return(:status => 200, :body => json_second_page, :headers => response_headers)

    expect((ConsultantService.consultants staffing_office: @office)).to contain_exactly(@alice, @bob, @eve)
  end

  it 'should retrieve all consultants by staffing office and role' do
    response_headers = {
      'X-Total-Pages'=>'2'
    }

    json_first_page = [to_json(@alice), to_json(@bob)].to_json
    WebMock.stub_request(:get, jigsaw_url(@office, 1)).
      with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => response_headers)

    json_second_page = [to_json(@eve)].to_json
    WebMock.stub_request(:get, jigsaw_url(@office, 2)).
      with(:headers => @request_headers).to_return(:status => 200, :body => json_second_page, :headers => response_headers)

    role = 'Dev'
    expect((ConsultantService.consultants staffing_office: @office, role: role)).to contain_exactly(@bob)
  end
end