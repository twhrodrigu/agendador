require './calendar/calendar_api'
require './consultant/consultant_api'

run Rack::Cascade.new [Agendador::CalendarAPI, Agendador::ConsultantAPI]