require './api'
require './app'

run Rack::Cascade.new [Agendador::API, Agendador::Web]