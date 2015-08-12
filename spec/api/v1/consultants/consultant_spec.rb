require './api/v1/root'
require 'fakeredis'

module API
  module V1
    describe 'Consultant' do

      before(:each) do
        @redis = Redis.new
        @redis.flushdb
      end

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

      it 'should initialize from jigsaw json' do
        json = {
          'employeeId'    => '1',
          'loginName'     => 'alice',
          'preferredName' => 'Alice',
          'role'          => {'name'=> 'Dev'}
        }

        alice = Consultants::Consultant.from_jigsaw json
        expect(alice.id).to eq(1)
        expect(alice.name).to eq('Alice')
        expect(alice.login).to eq('alice')
        expect(alice.role).to eq('Dev')
      end

      it 'should initialize from redis' do
        attrs = { id: 1, login: 'alice', name: 'Alice', role: 'Dev', p2: 1, p3: 2 }
        @redis.hset Consultants::Consultant::REDIS_SCOPE, attrs[:login], attrs.to_json

        alice = Consultants::Consultant.from_redis(@redis, attrs[:login])
        expect(alice.id).to eq(attrs[:id])
        expect(alice.login).to eq(attrs[:login])
        expect(alice.name).to eq(attrs[:name])
        expect(alice.role).to eq(attrs[:role])
        expect(alice.p2).to eq(attrs[:p2])
        expect(alice.p3).to eq(attrs[:p3])
      end

      it 'should set attributes (ovewriding)' do
        attrs = { id: 1, login: 'alice', name: 'Alice', role: 'Dev', p2: 1, p3: 2 }
        consultant = Consultants::Consultant.new({ id: 2, login: 'bob', name: 'Robert', role: 'QA', p2: 0, p3: 1 })
        consultant.set_attributes(attrs, overwrite: true)
        expect(consultant.id).to eq(attrs[:id])
        expect(consultant.login).to eq(attrs[:login])
        expect(consultant.name).to eq(attrs[:name])
        expect(consultant.role).to eq(attrs[:role])
        expect(consultant.p2).to eq(attrs[:p2])
        expect(consultant.p3).to eq(attrs[:p3])
      end

      it 'should set attributes (not ovewriding)' do
        alice = { id: 1, login: 'alice', name: 'Alice',  role: 'Dev', p2: 1 }
        bob   = { id: 2, login: 'bob',   name: 'Robert', role: 'Dev', p3: 2 }

        consultant = Consultants::Consultant.new(alice)
        consultant.set_attributes(bob, overwrite: false)
        expect(consultant.id).to eq(alice[:id])
        expect(consultant.login).to eq(alice[:login])
        expect(consultant.name).to eq(alice[:name])
        expect(consultant.role).to eq(alice[:role])
        expect(consultant.p2).to eq(alice[:p2])
        expect(consultant.p3).to eq(bob[:p3])
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

      it 'should merge jigsaw attrs' do
        consultant = Consultants::Consultant.new(id: 1, login: 'alice', name: 'Alice', role: 'Dev', p2: 0, p3: 1)
        consultant.merge_jigsaw_attrs({
          'employeeId'    => '2',
          'loginName'     => 'bob',
          'preferredName' => 'Robert',
          'role'          => { 'name' => 'QA' },
          'p2'            => 1,
          'p3'            => 2
        })
        expect(consultant.id).to eq(2)
        expect(consultant.login).to eq('bob')
        expect(consultant.name).to eq('Robert')
        expect(consultant.role).to eq('QA')
        expect(consultant.p2).to eq(0) # p2 should be ignored; it shouldn't come from jigsaw
        expect(consultant.p3).to eq(1) # p3 should be ignored; it shouldn't come from jigsaw
      end

      it 'should merge redis attrs' do
        attrs = { id: 2, login: 'alice', name: 'Phonyname', role: 'QA', p2: 1, p3: 2 }
        @redis.hset Consultants::Consultant::REDIS_SCOPE, attrs[:login], attrs.to_json

        consultant = Consultants::Consultant.new(id: 1, login: 'alice', name: 'Alice', role: 'Dev')
        consultant.merge_redis_attrs(@redis)
        expect(consultant.id).to eq(1)
        expect(consultant.login).to eq('alice')
        expect(consultant.name).to eq('Alice')
        expect(consultant.role).to eq('Dev')
        expect(consultant.p2).to eq(1)
        expect(consultant.p3).to eq(2)
      end

      it 'should serialize to json' do
        bob = Consultants::Consultant.new id: 1, login: 'bob', role: 'Dev', name: 'Bob'
        expect(bob.as_json).to eq({id: 1, login: bob.login, email: bob.email, name: bob.name, role: bob.role, p2: nil, p3: nil})
      end

      it 'should save to redis' do
        consultant = Consultants::Consultant.new(id: 2, login: 'bob', name: 'Robert', role: 'QA', p2: 2, p3: 0)
        consultant.to_redis(@redis)

        attrs = JSON.parse(@redis.hget(Consultants::Consultant::REDIS_SCOPE, 'bob'))
        expect(attrs['id']).to eq(2)
        expect(attrs['login']).to eq('bob')
        expect(attrs['name']).to eq('Robert')
        expect(attrs['role']).to eq('QA')
        expect(attrs['p2']).to eq(2)
        expect(attrs['p3']).to eq(0)
      end
    end

  end
end
