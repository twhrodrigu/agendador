require './app'
require './api'

run Rack::Cascade.new [Agendador::API, Agendador::Web]
