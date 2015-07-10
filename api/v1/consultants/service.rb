require 'json'
require 'net/http'

module API
  module V1
    module Consultants
      class Service

        def self.consultants(params)
          staffing_office = params[:staffing_office]
          role = params[:role]
          if role
            consultants_by_staffing_office_and_role(staffing_office, role)
          else
            consultants_by_staffing_office(staffing_office)
          end
        end

        private

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

        def self.consultants_by_staffing_office_and_role(staffing_office, role)
          all_consultants = consultants_by_staffing_office(staffing_office)
          all_consultants.select { |consultant|
            consultant.role == role
          }
        end

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
            consultants.push(Consultant.from_jigsaw_json(json))
          end
          return consultants
        end

      end
    end
  end
end
