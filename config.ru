require './app'
require './calendar/calendar_api'
require './consultant/consultant_api'

run Rack::Cascade.new [Agendador::Web, Agendador::CalendarAPI, Agendador::ConsultantAPI]
