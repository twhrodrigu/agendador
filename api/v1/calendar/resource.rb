require 'grape'
require 'json'

require_relative 'service'
require_relative '../defaults'
require_relative '../consultants/service'
require_relative '../consultants/consultant'

module API
  module V1
    module Calendar
      class Resource < Grape::API
        
        include API::V1::Defaults

        resource :calendar do

          desc "Returns people available for a period"
          params do
            requires :token, type: String, desc: "Google Calendar Access Token"
            requires :start, type: DateTime, desc: "The start of the interval for the query"
            optional :hours, type: Integer, desc: "The number of hours should be available", default: 1
            requires :office, type: String,  desc: "The office of interest"
            optional :role, type: String, desc: "The role of interest"
          end
          get :available do
            consultants = Consultants::Service.consultants staffing_office: params[:office].tr('Ãã ', 'Aa+'), role: params[:role]
            available_consultants = Service.availability token: params[:token], consultants: consultants, start: params[:start], hours: params[:hours]
            return available_consultants.map { |c| c.as_json }
          end

        end

      end
    end
  end
end