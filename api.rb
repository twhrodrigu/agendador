require 'grape'
require './lib/consultant_service'
require './lib/consultant'
require './lib/calendar_service'
require 'json'

module Agendador

  class API < Grape::API
    version 'v1', using: :path
    format :json

    helpers do
      def permitted_params
          @permitted_params ||= declared(params, include_missing: false)
      end
    end

    before do
      header "Access-Control-Allow-Origin", "*"
    end

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
        consultants = ConsultantService.consultants staffing_office: params[:office].tr('Ãã ', 'Aa+'), role: params[:role]
        available_consultants = CalendarService.availability token: params[:token], consultants: consultants, start: params[:start], hours: params[:hours]
        json_consultants = []
        available_consultants.each do |consultant|
          json_consultants.push(consultant.as_json)
        end 
        json_consultants
      end

    end

    desc "Gets all supported offices"
    get :offices do
      ConsultantService.offices
    end

    desc "Gets all supported roles"
    get :roles do
      ConsultantService.roles
    end

  end
end
