require 'time'
require 'net/https'

module API
  module V1
    module Calendar
      module Service

        TIMEZONE_OFFSET = "00:00:00"

        def self.availability(token:, consultants:, start:, hours: 1)
          all_consultants = consultants.dup

          requests = build_requests consultants, start, hours
          responses = execute_requests token, requests

          available_emails = get_available_emails responses
          filter_consultants all_consultants, available_emails
        end

        def self.format(time, duration_in_hours=0)
          (DateTime.parse("#{time}#{TIMEZONE_OFFSET}") + duration_in_hours/24.0).to_s
        end

        private

        def self.build_requests(consultants, start, hours)
          requests = []
          while !consultants.empty? do
            requests << {
              :timeMin => format(start),
              :timeMax => format(start, hours),
              :items => build_request_items(consultants.shift(10))
            }
          end
          requests
        end

        def self.execute_requests(token, requests) 
          responses = []
          requests.each do |request|
            responses << (execute_request token, request)
          end
          responses
        end

        def self.execute_request(token, request)
          uri = URI("https://www.googleapis.com/calendar/v3/freeBusy?key=#{ENV['GOOGLE_API_KEY']}&alt=json")
          http_request = build_http_request uri, token, request

          Net::HTTP.start(
            uri.host, uri.port,
            :use_ssl => uri.scheme == 'https',
            :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |https|
              https.request(http_request)
            end
        end

        def self.build_http_request(uri, token, request)
          http_request = Net::HTTP::Post.new(uri.path)
          http_request.add_field('content-type', 'application/json')
          http_request['Authorization'] = "Bearer #{token}"
          http_request.body = JSON.dump(request)
          http_request
        end

        def self.get_available_emails(responses)
          responses.map {|e| JSON.parse(e.body)["calendars"] }.
            reduce(&:merge).
            select { |email_key, user_info| user_info["busy"].empty? && user_info["errors"].nil? }.
            map {|email_key, user_info| email_key }
        end

        def self.filter_consultants(consultants, emails)
          filtered_consultants = []

          consultants.each do |consultant|
            filtered_consultants.push(consultant) if emails.include?(consultant.email)
          end

          filtered_consultants
        end

        def self.build_request_items(consultants)
          items = []
          consultants.each do |consultant|
            items.push({id: consultant.email})
          end
          items
        end

      end
    end
  end
end
