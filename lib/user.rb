require 'json'
require 'net/http'

class User
  attr_accessor :email, :token
  @total_pages

  def initialize(params)
    self.email = params[:email]
    self.token = params[:token]
  end

  def self.all(params)
    get_consultants(params[:office]).
      select { |e|
        e['role']['name'] == params[:role]
      }.
      map { |e|
        login = e['loginName']
        { 
          :id => "#{login}@thoughtworks.com",
          :name => e['preferredName']
        }
      }
  end

  def self.roles
    @@roles ||= JSON.parse(open('resources/roles.json').read)
  end

  def self.offices
    @@offices ||= JSON.parse(open('resources/offices.json').read)
  end

  def self.get_consultants(office)
    page_number = 1
    consultants_json = []

    loop do
      partial_consultants = execute_request(page_number, office)

      partial_consultants.each do |consultant|
        consultants_json << consultant
      end

      page_number += 1

      break if (page_number > @total_pages)
    end

    consultants_json
  end

  def self.execute_request(page_number, office)
    uri = URI("https://jigsaw.thoughtworks.com/api/people?staffing_office=#{office}&page=#{page_number}")

    request = Net::HTTP::Get.new uri
    request['Content-Type'] = 'application/json'
    request['Authorization'] = ENV['JIGSAW_API_SECRET']
    request['X-Service-Version'] = '2'

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      response = http.request(request)

      @total_pages ||= response['X-Total-Pages'].to_i
      JSON.parse(response.body)
    end
  end

end
