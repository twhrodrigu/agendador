require './app'
require './api'

run Rack::Cascade.new [AgendaEntrevista::API, AgendaEntrevista::Web]
