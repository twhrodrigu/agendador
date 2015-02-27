require 'grape'
require './lib/collaborator.rb'

module AgendaEntrevista
  class API < Grape::API
    version 'v1', using: :path
    format :json

    helpers do
      def permitted_params
          @permitted_params ||= declared(params, include_missing: false)
      end
    end

    resource :calendar do

      desc "Returns people available for a period"
      params do
        requires :token, type: String, desc: "Google Calendar Access Token"
        requires :start, type: DateTime, desc: "The start of the interval for the query"
        optional :hours, type: Integer, desc: "The number of hours should be available", default: 1
        optional :role, type: String, desc: "The role of interest", default: 'Dev'
      end
      get :available do
        Calendar.availability(params[:token], permitted_params)
      end

    end

    desc "Returns list of roles inside ThoughtWorks"
    get :roles do
      User.roles
    end

    desc "Returns list of consultants based on the office and roles"
    params do
      requires :office, type: String, desc: "The office where they work"
      requires :role, type: String, desc: "The role they belong"
    end
    get :consultants do
      User.all(permitted_params)
    end

    desc "Returns list of people who contributed to the project sorted by #commits"
    get :collaborators do
      Collaborator.all
    end

  end
end
