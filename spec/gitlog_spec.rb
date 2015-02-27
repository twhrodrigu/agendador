require './lib/gitlog.rb'

describe GitLog do
  context '.shortlog' do
    it 'uses git shortlog -sne' do
      expect(GitLog).to receive(:`).with('git shortlog -sne')
      GitLog.shortlog
    end
  end
end


