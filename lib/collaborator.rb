require './lib/gitlog'

class Collaborator 

  def self.all
    GitLog.shortlog.lines
      .map do |line| 
        regexp = /(?<commits>\d+)\s*(?<name>[\w\s]*)\s\<(?<email>.*)\>/
        commits, name, email = regexp.match(line).captures
        {
          :commits => commits.to_i,
          :name => name,
          :email => email
        }
      end
  end
end
