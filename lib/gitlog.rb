class GitLog
  def self.shortlog
    `git shortlog -sne`
  end
end
