require 'json'

# Jigsaw json format example:
# [
# {
#   "consultant" => {
#     "employee_id"=>"10000", 
#     "full_name"=>"Joe Montana", 
#     "gender"=>"Male",
#     "primary_role"=>"BA",
#     "grade"=>"Consultant", 
#     "department"=>"PS",
#     "total_experience"=>2.00,
#     "tw_experience"=>1.00,
#     "home_office"=>"Porto Alegre", 
#     "working_office"=>"Pune",
#     "skills"=>{
#     }
#   }
# }, ...
# ]

class User
  attr_accessor :email, :token
  def initialize(params)
    self.email = params[:email]
    self.token = params[:token]
  end

  def self.all(params)
    get_consultants.
      select { |e| e['consultant']['home_office'] == params[:office] &&
                   e['consultant']['primary_role'] == params[:role] }.
      map { |e| { :id => "#{e['consultant']['employee_id']}@thoughtworks.com" } }
  end

  def self.roles
    @@roles ||= get_consultants.map { |e| e['consultant']['primary_role'] }.uniq
  end

  def self.get_consultants
    @@consultants ||= JSON.parse(open('resources/consultants.json').read)
  end
end
