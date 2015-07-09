require './app'
require './calendar/calendar_api'
require './consultant/consultant_api'
require './office/office_api'

run Rack::Cascade.new [Agendador::Web, Agendador::CalendarAPI, Agendador::ConsultantAPI, Agendador::OfficeAPI]
