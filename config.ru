require './app'
require './api'

use Rack::Session::Cookie
run Rack::Cascade.new [AgendaEntrevista::API, AgendaEntrevista::WEB]
