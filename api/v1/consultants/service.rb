require 'set'
require 'json'
require 'redis'
require 'net/http'
require 'active_support/inflector'
require_relative './consultant'
require_relative '../offices/resource'

module API
  module V1
    module Consultants
      class Service
        JIGSAW_URL = 'https://jigsaw.thoughtworks.com/api/people'

        def self.consultants(params)
          staffing_office = params[:staffing_office]
          role = params[:role] if params[:role] != 'All'
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
          uri = URI.parse(JIGSAW_URL)
          uri.query = URI.encode_www_form({ staffing_office: staffing_office, page: page })

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
            consultants.push(Consultant.from_jigsaw(json))
          end
          return consultants
        end

        def self.save_jigsaw_consultants_to_redis(redis = Redis.new(url: ENV['REDIS_URL']))
          not_found = Set.new(redis.hkeys(Consultant::REDIS_SCOPE))
          offices   = JSON.parse(open(API::V1::Offices::Resource::JSON_FILE).read)
          verbose   = !!ENV['VERBOSE']
          offices.each do |office|
            office = ActiveSupport::Inflector.transliterate(office)
            consultants_by_staffing_office(office).each do |consultant|
              consultant.merge_redis_attrs(redis)
              consultant.not_found = 0
              consultant.to_redis(redis)
              not_found.delete(consultant.login)
              puts "saved consultant: #{consultant.as_json.inspect}" if verbose
            end
          end

          # mark entries not retrived from jigsaw queries as "not found"
          not_found.each do |login|
            consultant = Consultant.from_redis(redis, login)
            consultant.not_found = (consultant.not_found || 0) + 1
            consultant.to_redis(redis)
            puts "marked consultant #{consultant.login} as not found (#{consultant.not_found})" if verbose
          end
        end
      end
    end
  end
end
