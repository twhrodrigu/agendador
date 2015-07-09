require './app'
require './api/v1/calendar/calendar_api'
require './api/v1/office/office_api'
require './api/v1/role/role_api'

run Rack::Cascade.new [Agendador::Web, Agendador::CalendarAPI, Agendador::OfficeAPI, Agendador::RoleAPI]