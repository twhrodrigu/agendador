require 'json'
require 'net/http'

class User
  attr_accessor :email, :token
  def initialize(params)
    self.email = params[:email]
    self.token = params[:token]
  end

  def self.all(params)
    get_consultants(params[:office]).
      select { |e|
        e['role']['name'] == params[:role]}.
      map { |e|
        login = e['loginName']
        { :id => "#{login}@thoughtworks.com" }
      }
  end

  def self.roles
    @@roles ||= JSON.parse(open('resources/roles.json').read)
  end

  def self.get_consultants(office)
    uri = URI('https://jigsaw.thoughtworks.com/api/people?staffing_office='+office)

    request = Net::HTTP::Get.new uri
    request['Content-Type'] = 'application/json'
    request['Authorization'] = 'e9c735405f523e81f2f2884ea116411f'
    request['X-Service-Version'] = '2'

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      response = http.request(request)

      JSON.parse(response.body)
    end
  end

end
