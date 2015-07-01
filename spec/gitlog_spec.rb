require './lib/gitlog.rb'

describe GitLog do
  context '.shortlog' do
    let(:commits){
      <<-eos
          6  Bob Martin <unclebob@cleancode.com>
          4  Edsger W. Dijkstra <edsger@dijkstra.com>
      eos
    }

    it 'returns commit count' do
      allow(GitLog).to receive(:`).and_return(commits)

      expect(GitLog.shortlog).to eq([
        {:commits => 6, :name => 'Bob Martin', :email => 'unclebob@cleancode.com'},
        {:commits => 4, :name => 'Edsger W. Dijkstra', :email => 'edsger@dijkstra.com'}
      ])
    end
  end
end
