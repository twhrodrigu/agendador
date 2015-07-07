require 'sinatra'
require 'json'
require './lib/user'
require './lib/calendar'

module Agendador
  class Web < Sinatra::Application
    get '/' do
    	redirect to('index.html')
    end
  end
end