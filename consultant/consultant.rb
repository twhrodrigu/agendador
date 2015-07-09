class Consultant

  attr_accessor :login, :name, :role

  def initialize(params)
    @login = params[:login]
    @name = params[:name]
    @role = params[:role]
  end

  def email
    "#{login}@thoughtworks.com"
  end

  def self.from_jigsaw_json(json)
    Consultant.new login: json['loginName'], name: json['preferredName'], role: json['role']['name']
  end

  def as_json
    {login: login, email: email, name: name, role: role}
  end

  def ==(other)
    self.login == other.login && self.name == other.name && self.role == other.role
  end
end