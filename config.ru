require './api'

run Rack::Cascade.new [Agendador::API]