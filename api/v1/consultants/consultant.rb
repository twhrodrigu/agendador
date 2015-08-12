module API
  module V1
    module Consultants
      class Consultant
        REDIS_SCOPE         = 'consultants'
        EXPERIENCE          = [ nil, 0, 1, 2 ]
        NOT_FOUND_THRESHOLD = 5

        attr_accessor :id, :login, :name, :role, :p2, :p3, :not_found

        def initialize(attrs = nil)
          set_attributes(attrs) if attrs
        end

        def self.from_jigsaw(json)
          new.merge_jigsaw_attrs(json)
        end

        def self.from_redis(redis, login)
          json  = redis.hget(REDIS_SCOPE, login)
          attrs = JSON.parse(json)
          new(attrs)
        end

        def self.from_hash(str)
        end

        def self.all_from_redis(redis)
          redis.hgetall(REDIS_SCOPE).values
                                    .map{|value| new(JSON.parse(value)) }
                                    .reject{|consultant| consultant.not_found && consultant.not_found >= NOT_FOUND_THRESHOLD }
        end

        def set_attributes(attrs, overwrite: false)
          attrs.each do |attr, value|
            if respond_to?("#{attr}=".to_sym)
              send("#{attr}=", value) if overwrite || !send(attr.to_sym)
            end
          end
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

        def merge_jigsaw_attrs(json)
          self.id    = json['employeeId'].to_i
          self.login = json['loginName']
          self.name  = json['preferredName']
          self.role  = json['role']['name']
          self
        end

        def merge_redis_attrs(redis)
          json = redis.hget(REDIS_SCOPE, login)
          set_attributes(JSON.parse(json), overwrite: false) if json
        end

        def as_json
          {id: id, login: login, email: email, name: name, role: role, p2: p2, p3: p3}
        end

        def to_json(*args)
          as_json.to_json(*args)
        end

        def to_redis(redis)
          attrs = as_json
          attrs.merge!(not_found: not_found) if not_found
          redis.hset(REDIS_SCOPE, login, attrs.to_json)
        end

        def ==(other)
          other                     &&
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
