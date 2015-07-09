require './app'
require './calendar/calendar_api'
require './office/office_api'
require './role/role_api'

run Rack::Cascade.new [Agendador::Web, Agendador::CalendarAPI, Agendador::OfficeAPI, Agendador::RoleAPI]