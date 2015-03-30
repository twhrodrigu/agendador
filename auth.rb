require 'sinatra'
require 'omniauth'
require 'omniauth-saml'
require 'securerandom'

module AgendaEntrevista
  module Auth
    module Helpers
      def protected!
        return if authorized?
        redirect to("/auth/saml?redirectUrl=#{URI::encode(request.path)}")
      end

      def authorized?
        !session[:auth].nil?
      end
    end

    def self.registered(app)
      app.helpers Auth::Helpers
      app.enable :session
      app.set :session_secret, ENV['SECRET_TOKEN'] || SecureRandom.hex
      app.use OmniAuth::Builder do
        provider :saml,
          :issuer                             => "Agendador de Entrevistas",
          :idp_sso_target_url                 => ENV['SAML_TARGET_URL'],
          :idp_cert_fingerprint               => ENV['SAML_FINGERPRINT'],
          :name_identifier_format             => "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
          :idp_sso_target_url_runtime_params  => {:redirectUrl => :RelayState}
      end
    end
  end
end
