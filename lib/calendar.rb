require 'time'


module Calendar
  TIMEZONE_OFFSET = "-02:00:00" # because of 'horario de verao", usually is -03:00:00 (for POA)

  def self.format(time, duration_in_hours=0)
    (DateTime.parse("#{time}#{TIMEZONE_OFFSET}") + duration_in_hours/24.0).to_s
  end

  def self.availability(api_token, params, duration_in_hours=1)
    request = {
      :timeMin => format(params[:start]),
      :timeMax => format(params[:start], duration_in_hours),
      :items => User.all(:office => 'Porto Alegre', :role => params[:role])
    }
  end
end
