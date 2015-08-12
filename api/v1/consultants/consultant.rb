module API
  module V1
    module Consultants
      class Consultant
        REDIS_SCOPE = 'consultants'
        EXPERIENCE  = [ nil, 0, 1, 2 ]

        attr_accessor :id, :login, :name, :role, :p2, :p3

        def initialize(id: nil, login: nil, name: nil, role: nil, p2: nil,  p3: nil)
          self.id = id
          self.login = login
          self.name = name
          self.role = role
          self.p2 = p2
          self.p3 = p3
        end

        def email
          "#{login}@thoughtworks.com"
        end

        def p2=(value)
          EXPERIENCE.include?(value) or raise ArgumentError.new("invalid p2 experience value: #{value}")
          @p2 = value
        end

        def p3=(value)
          EXPERIENCE.include?(value) or raise ArgumentError.new("invalid p3 experience value: #{value}")
          @p3 = value
        end

        def self.from_jigsaw_json(json)
          Consultant.new(id: json['employeeId']).merge_jigsaw_json(json)
        end

        def self.from_redis(str)
          json = JSON.parse(str)
          Consultant.new(id: json['id'], login: json['login'], name: json['name'], role: json['role'], p2: json['p2'], p3: json['p3'])
        end

        def merge_jigsaw_json(json)
          self.login = json['loginName']
          self.name  = json['preferredName']
          self.role  = json['role']['name']
          self
        end

        def as_json
          {id: id, login: login, email: email, name: name, role: role, p2: p2, p3: p3}
        end

        def to_json(*args)
          as_json.to_json(*args)
        end

        def ==(other)
          self.id    == other.id    &&
          self.login == other.login &&
          self.name  == other.name  &&
          self.role  == other.role  &&
          self.p2    == other.p2    &&
          self.p3    == other.p3
        end

      end
    end
  end
end
