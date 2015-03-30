require 'sinatra'
require 'oauth2'
require 'json'
require './lib/user'
require './lib/calendar'
require './auth'


module AgendaEntrevista
  class WEB < Sinatra::Application
    use Rack::Session::Cookie
    register AgendaEntrevista::Auth

    set :protection, :except => :frame_options
    set :bind, '0.0.0.0'

    get '/' do
      protected!
      File.read(File.join('public', 'index.html'))
    end

    post '/auth/saml/callback' do
      auth = request.env['omniauth.auth']
      session[:auth] = JSON.dump(auth)
      redirect to(params[:RelayState] || '/')
    end
  end
end
