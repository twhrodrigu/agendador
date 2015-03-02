class GitLog
  def self.shortlog
    command('git shortlog -sne').lines
      .map do |line| 
        regexp = /(?<commits>\d+)\s*(?<name>.*)\s\<(?<email>.*)\>/
        commits, name, email = regexp.match(line).captures
        {
          :commits => commits.to_i,
          :name => name,
          :email => email
        }
    end
  end
  def self.command cmd
    `#{cmd}`
  end
end
