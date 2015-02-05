#!/usr/bin/env ruby

require 'json'
require 'net/https'

token = ARGV[0]

all_consultants = JSON.parse(open('resources/consultants.json').read)

result = { :pairs => {} }
all_consultants.select { |e| e['consultant']['working_office'] == 'Porto Alegre' }.each do |c|
  employee_id = c['consultant']['employee_id']
  uri = URI("https://jigsaw.thoughtworks.com/api/consultants/#{employee_id}")

  req = Net::HTTP::Get.new(uri.path)
  req['Authorization'] = token
  res = Net::HTTP.start(
    uri.host, uri.port, 
    :use_ssl => uri.scheme == 'https', 
    :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |https|
    https.request(req)
  end
  result[:pairs][employee_id] = JSON.parse(res.body)['loginName'] 
end

open('employee_id-login_name.json', 'w') do |f|
  f.puts result.to_json
end

  
