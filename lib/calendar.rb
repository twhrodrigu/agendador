require 'time'
require 'net/https'


module Calendar
  TIMEZONE_OFFSET = "00:00:00"

  def self.format(time, duration_in_hours=0)
    (DateTime.parse("#{time}#{TIMEZONE_OFFSET}") + duration_in_hours/24.0).to_s
  end

  def self.availability(api_token, params, duration_in_hours=1)
    consultants = User.all(:office => params[:office].tr('Ãã ', 'Aa+')  , :role => params[:role])
    all_consultants = consultants.dup
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
      uri = URI("https://www.googleapis.com/calendar/v3/freeBusy?key=#{ENV['GOOGLE_API_KEY']}&alt=json")
      req = Net::HTTP::Post.new(uri.path)
      req.add_field('content-type', 'application/json')
      req['Authorization'] = "Bearer #{api_token}"
      req.body = JSON.dump(request)
      puts "Req Body: #{req.body}"
      responses << Net::HTTP.start(
        uri.host, uri.port,
        :use_ssl => uri.scheme == 'https',
        :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |https|
        https.request(req)
      end
    end

    responses.each do |resp|
      json_data = JSON.parse(resp.body)
      puts "Responses: #{json_data}"
    end


    emails_users_available = responses.map {|e| JSON.parse(e.body)["calendars"] }.
      reduce(&:merge).
      select { |email_key, user_info| user_info["busy"].empty? && user_info["errors"].nil? }.
      map {|email_key, user_info| email_key }

    filterConsultants(all_consultants, emails_users_available)
  end

  def self.filterConsultants(consultants, emails)
    filteredConsultants = []

    consultants.each do |consultant|
      filteredConsultants.append(consultant) if emails.include?(consultant[:id])
    end

    filteredConsultants
  end
end
