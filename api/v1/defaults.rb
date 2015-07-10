require 'grape'

module API
  module V1
    module Defaults

      def self.included(api)
        api.format :json
        api.version 'v1', using: :path
      
        api.before do
          header "Access-Control-Allow-Origin", "*"
        end
      end
    
    end
  end
end