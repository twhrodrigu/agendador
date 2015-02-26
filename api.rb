require 'grape'

module AgendaEntrevista
    class API < Grape::API
      version 'v1', using: :path
      format :json

      resource :calendar do

        desc "Return people available for a given period"
        params do
          requires :token, type: String, desc: "Google Calendar Access Token"
          requires :start, type: DateTime, desc: "Start datetime"
          optional :hours, type: Integer, desc: "Hours available", default: 1
          optional :role, type: String, desc: "Desired role", default: 'Dev'
        end
        get :available do
          Calendar.availability(params[:token], params)
        end

      end

    end
end
