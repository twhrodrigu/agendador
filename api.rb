require 'grape'

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

    desc "Return list of roles available"
    get :roles do
      User.roles
    end

    desc "Return consultants based on the office and roles"
    params do
      requires :office, type: String, desc: "The office where they work"
      requires :role, type: String, desc: "The role they belong"
    end
    get :consultants do
      User.all(permitted_params)
    end

  end
end
