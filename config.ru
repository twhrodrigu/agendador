require './app'
require './api/root'

run Rack::Cascade.new [Agendador::Web, API::Root]
