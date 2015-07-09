require './app'
require './api/v1/calendar/calendar_api'
require './api/v1/offices/office_api'
require './api/v1/roles/role_api'

run Rack::Cascade.new [Agendador::Web, Agendador::CalendarAPI, Agendador::OfficeAPI, Agendador::RoleAPI]