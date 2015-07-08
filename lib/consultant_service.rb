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
    current_page = 1
    all_consultants = []
    loop do
      page_consultants, total_pages = paginated_consultants_by_staffing_office(staffing_office, current_page)
      all_consultants.concat page_consultants

      current_page += 1
      break if current_page > total_pages
    end

    return all_consultants
  end

  private

  def self.paginated_consultants_by_staffing_office(staffing_office, page) 
    response = execute_request(staffing_office, page)
    page_consultants = extract_consultants_from_response_body(response.body)
    total_pages = response['X-Total-Pages'].to_i

    return page_consultants, total_pages
  end

  def self.execute_request(staffing_office, page)
    uri = URI("https://jigsaw.thoughtworks.com/api/people?staffing_office=#{staffing_office}&page=#{page}")

    request = Net::HTTP::Get.new uri
    request['Content-Type'] = 'application/json'
    request['Authorization'] = ENV['JIGSAW_API_SECRET']
    request['X-Service-Version'] = '2'

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      return http.request(request)
    end
  end

  def self.extract_consultants_from_response_body(response_body)
    consultants_json = JSON.parse(response_body)
    consultants = []
    consultants_json.each do |json|
      consultants.append(Consultant.from_json(json))
    end
    return consultants
  end
end