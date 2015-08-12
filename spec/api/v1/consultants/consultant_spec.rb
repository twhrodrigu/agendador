require './api/v1/root'

module API
  module V1
    describe 'Consultant' do

      it 'should initialize with id, login, name, role, p2 and p3' do
        expected_id = 1
        expected_login = 'johndoe'
        expected_name = 'John Doe'
        expected_role = 'Dev'
        expected_p2 = 0
        expected_p3 = 1

        consultant = Consultants::Consultant.new id: expected_id, login: expected_login, name: expected_name, role: expected_role, p2: expected_p2, p3: expected_p3
        expect(consultant.id).to eq(expected_id)
        expect(consultant.login).to eq(expected_login)
        expect(consultant.name).to eq(expected_name)
        expect(consultant.role).to eq(expected_role)
        expect(consultant.p2).to eq(expected_p2)
        expect(consultant.p3).to eq(expected_p3)
      end

      it 'should accept valid p2 and p3 values' do
        consultant = Consultants::Consultant.new
        Consultants::Consultant::EXPERIENCE.each do |value|
          consultant.p2 = value
          consultant.p3 = value
          expect(consultant.p2).to eq(value)
          expect(consultant.p3).to eq(value)
        end
      end

      it 'should not accept invalid p2 and p3 values' do
        consultant = Consultants::Consultant.new
        expect{ consultant.p2 = 'invalid_value' }.to raise_error(ArgumentError)
        expect{ consultant.p3 = 'invalid_value' }.to raise_error(ArgumentError)
      end

      it 'should get ThoughtWorks email' do
        consultant = Consultants::Consultant.new login: 'johndoe', name: 'John Doe', role: 'Dev'
        expect(consultant.email).to eq('johndoe@thoughtworks.com')
      end

      it 'should deserialize from jigsaw json' do
        json = {
          'loginName' => 'alice',
          'preferredName' => 'Alice',
          'role' => {'name'=> 'Dev'}
        }

        alice = Consultants::Consultant.from_jigsaw_json json
        expect(alice.name).to eq('Alice')
        expect(alice.login).to eq('alice')
        expect(alice.role).to eq('Dev')
      end

      it 'should serialize from redis string' do
        json = { id: 1, login: 'john', name: 'John Doe', role: 'Dev', p2: 0, p3: 1 }
        consultant = Consultants::Consultant.from_redis(json.to_json);
        expect(consultant.id).to eq(json[:id])
        expect(consultant.login).to eq(json[:login])
        expect(consultant.name).to eq(json[:name])
        expect(consultant.role).to eq(json[:role])
        expect(consultant.p2).to eq(json[:p2])
        expect(consultant.p3).to eq(json[:p3])
      end

      it 'should merge jigsaw json' do
        consultant = Consultants::Consultant.new(id: 1, login: 'john', name: 'John Doe', role: 'Dev', p2: 0, p3: 1)
        consultant.merge_jigsaw_json({
          'loginName' => 'mary',
          'preferredName' => 'Mary Jane',
          'role' => { 'name' => 'QA' }
          'p2' => 1,
          'p3' => 2
        })
        expect(consultant.id).to eq(1)
        expect(consultant.login).to eq('mary')
        expect(consultant.name).to eq('Mary Jane')
        expect(consultant.role).to eq('QA')
        expect(consultant.p2).to eq(0) # p2 should be ignored; it shouldn't come from jigsaw
        expect(consultant.p3).to eq(1) # p3 should be ignored; it shouldn't come from jigsaw
      end

      it 'should serialize to json' do
        bob = Consultants::Consultant.new id: 1, login: 'bob', role: 'Dev', name: 'Bob'
        expect(bob.as_json).to eq({id: 1, login: bob.login, email: bob.email, name: bob.name, role: bob.role, p2: nil, p3: nil})
      end
    end

  end
end
