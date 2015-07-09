require 'grape'
require 'json'

require './api/v1/consultants/service'
require './api/v1/consultants/consultant'
require './api/v1/calendar/service'

module Agendador

  class CalendarAPI < Grape::API
    version 'v1', using: :path
    format :json

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
        return available_consultants.map { |c| c.as_json }
      end

    end
    
  end
end