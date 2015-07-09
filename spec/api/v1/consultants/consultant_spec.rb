require './api/v1/consultants/consultant'

describe 'Consultant' do

  it 'should initialize with login, name and role' do
    expected_login = 'johndoe'
    expected_name = 'John Doe'
    expected_role = 'Dev'

    consultant = Consultant.new login: expected_login, name: expected_name, role: expected_role
    expect(consultant.login).to eq(expected_login)
    expect(consultant.name).to eq(expected_name)
    expect(consultant.role).to eq(expected_role)
  end

  it 'should get ThoughtWorks email' do
    consultant = Consultant.new login: 'johndoe', name: 'John Doe', role: 'Dev'
    expect(consultant.email).to eq('johndoe@thoughtworks.com')
  end

  it 'should deserialize from jigsaw json' do
    json = {
      'loginName' => 'alice',
      'preferredName' => 'Alice',
      'role' => {'name'=> 'Dev'}
    }

    alice = Consultant.from_jigsaw_json json
    expect(alice.name).to eq('Alice')
    expect(alice.login).to eq('alice')
    expect(alice.role).to eq('Dev')
  end

  it 'should serialize to json' do
    bob = Consultant.new login: 'bob', role: 'Dev', name: 'Bob'
    expect(bob.as_json).to eq({login: bob.login, email: bob.email, name: bob.name, role: bob.role})
  end
end