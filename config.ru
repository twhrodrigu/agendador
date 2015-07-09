require './app'
require './api/v1/calendar/api'
require './api/v1/offices/api'
require './api/v1/roles/api'

run Rack::Cascade.new [Agendador::Web, Agendador::CalendarAPI, Agendador::OfficeAPI, Agendador::RoleAPI]