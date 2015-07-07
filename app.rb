require 'sinatra'

module Agendador
  class Web < Sinatra::Application
    get '/' do
    	send_file 'public/index.html'
    end
  end
end