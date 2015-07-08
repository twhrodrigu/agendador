require 'json'
require 'net/http'
require 'byebug'

module ConsultantService

   def self.offices
      @@offices ||= JSON.parse(open('resources/offices.json').read)
   end

   def self.roles
      @@roles ||= JSON.parse(open('resources/roles.json').read)
  end

  def self.consultants_by_staffing_office(staffing_office)
    uri = URI("https://jigsaw.thoughtworks.com/api/people?staffing_office=#{staffing_office}")

    request = Net::HTTP::Get.new uri
    request['Content-Type'] = 'application/json'
    request['Authorization'] = ENV['JIGSAW_API_SECRET']
    request['X-Service-Version'] = '2'

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      response = http.request(request)
      return extract_consultants_from_response_body(response.body)
    end
  end

  private

  def self.extract_consultants_from_response_body(response_body)
    consultants_json = JSON.parse(response_body)
    consultants = []
    consultants_json.each do |json|
      consultants.append(Consultant.from_json(json))
    end
    return consultants
  end
end