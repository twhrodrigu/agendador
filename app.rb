require 'sinatra'
require 'oauth2'
require 'json'
require './lib/user'
require './lib/calendar'
 
 
# Scopes are space separated strings
SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/calendar.readonly'
].join(' ')
 
unless G_API_CLIENT = ENV['G_API_CLIENT']
  raise "You must specify the G_API_CLIENT env variable"
end
 
unless G_API_SECRET = ENV['G_API_SECRET']
  raise "You must specify the G_API_SECRET env veriable"
end
 
def client
  client ||= OAuth2::Client.new(G_API_CLIENT, G_API_SECRET, {
                :site => 'https://accounts.google.com', 
                :authorize_url => "/o/oauth2/auth", 
                :token_url => "/o/oauth2/token"
              })
end
 
module AgendaEntrevista
  class WEB < Sinatra::Application

    set :protection, :except => :frame_options

    get '/' do
      # TODO: implement before_filter to get user
      @user = session[:current_user]
      @roles = User.roles
      erb :index
    end

    get '/availability' do
      @user = session[:current_user]
      @available = Calendar.availability(@user.token, params)
      erb :availability
    end

    get "/auth" do
      redirect client.auth_code.authorize_url(:redirect_uri => redirect_uri,:scope => SCOPES,:access_type => "offline")
    end

    get '/oauth2callback' do
      access_token = client.auth_code.get_token(params[:code], :redirect_uri => redirect_uri)
      email = access_token.get('https://www.googleapis.com/userinfo/email?alt=json').parsed()["data"]["email"]
      session[:current_user] = User.new(:email => email, :token => access_token.token)
      redirect '/'
    end

    def redirect_uri
      uri = URI.parse(request.url)
      uri.path = '/oauth2callback'
      uri.query = nil
      uri.to_s
    end
  end
end
