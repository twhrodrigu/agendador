require 'time'
require 'net/https'


module Calendar
  TIMEZONE_OFFSET = "-02:00:00" # because of 'horario de verao", usually is -03:00:00 (for POA)

  def self.format(time, duration_in_hours=0)
    (DateTime.parse("#{time}#{TIMEZONE_OFFSET}") + duration_in_hours/24.0).to_s
  end

  def self.availability(api_token, params, duration_in_hours=1)
    consultants = User.all(:office => 'Porto Alegre', :role => params[:role])
    requests = []
    while !consultants.empty? do
      requests << {
        :timeMin => format(params[:start]),
        :timeMax => format(params[:start], duration_in_hours),
        :items => consultants.shift(10)
      }
    end

    responses = []
    requests.each do |request|
      uri = URI("https://www.googleapis.com/calendar/v3/freeBusy?key=#{ENV['G_API_KEY']}&alt=json")
      req = Net::HTTP::Post.new(uri.path)
      req.add_field('content-type', 'application/json')
      req['Authorization'] = "Bearer #{api_token}"
      req.body = JSON.dump(request)
      responses << Net::HTTP.start(
        uri.host, uri.port,
        :use_ssl => uri.scheme == 'https',
        :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |https|
        https.request(req)
      end
    end
    responses.map {|e| JSON.parse(e.body)["calendars"] }.
      reduce(&:merge).
      select { |k,v| v["busy"].empty? && v["errors"].nil? }.
      map {|k,v| k }
  end
end
