require './lib/collaborator.rb'

describe Collaborator do
  let(:commits){
    <<-eos
          6  Duda Dornelles <ddornell@thoughtworks.com>
          6  thiagofelix <felixthi@gmail.com>
    eos
  }

  context '.all' do
    it 'returns list of collaborator based on git log' do
      GitLog = double()
      allow(GitLog).to receive(:shortlog).and_return(commits)


      expect(Collaborator.all).to eq([
        {:commits => 6, :name => 'Duda Dornelles', :email => 'ddornell@thoughtworks.com'},
        {:commits => 6, :name => 'thiagofelix', :email => 'felixthi@gmail.com'}
      ])
    end
  end
end


