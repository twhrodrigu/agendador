require 'grape'
require 'redis'

module API
  module V1
    module Defaults

      def self.included(api)
        api.format :json
        api.version 'v1', using: :path
      
        api.before do
          header "Access-Control-Allow-Origin", "*"
        end

        api.helpers do
          def redis
            @redis ||= Redis.new(url: ENV['REDIS_URL'] || 'redis://127.0.0.1:6379/0')
          end
        end
      end
    
    end
  end
end
