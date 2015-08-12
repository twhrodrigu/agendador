require 'grape'
require 'pry'
require 'active_support/inflector'

require_relative '../defaults'

module API
  module V1
    module Consultants
      class Resource < Grape::API
        include API::V1::Defaults

        DEFAULT_PER_PAGE = 10

        helpers do
          def matches(consultant, query)
            name  = ActiveSupport::Inflector.transliterate(consultant.name.downcase)
            email = ActiveSupport::Inflector.transliterate(consultant.email.downcase)
            name.include?(query) || email.include?(query)
          end
        end

        rescue_from StandardError

        desc "Fetch/query consultants"
        params do
          optional :query,    type: String,  desc: 'The query string to match against the consultant\'s name or email'
          optional :page,     type: Integer, desc: 'The page number'
          optional :per_page, type: Integer, desc: 'The number items returned on each page'
        end
        get 'consultants' do
          query    = (params[:query] || '').strip.downcase
          page     = params[:page] || 1
          per_page = params[:per_page] || DEFAULT_PER_PAGE
          @consultants ||= begin
              result = Consultant.all_from_redis(redis)
              result = result.select{ |value| self.matches(value, query) } unless query.empty?
              result[((page - 1) * per_page), per_page] || []
          end
        end

        desc "Update a consultant's attributes"
        params do
          optional :p2, type: Integer, desc: 'The consultant\'s p2 interview experience'
          optional :p3, type: Integer, desc: 'The consultant\'s p3 interview experience'
        end
        put 'consultants/:login', requirements: { login: /[a-z]+/ } do
          consultant    = Consultant.from_redis(redis, params[:login]) or error!({ error: 'NOT FOUND' }, 404)
          consultant.p2 = params[:p2] if params[:p2]
          consultant.p3 = params[:p3] if params[:p2]
          consultant.to_redis(redis)
          consultant
        end
      end
    end
  end
end
