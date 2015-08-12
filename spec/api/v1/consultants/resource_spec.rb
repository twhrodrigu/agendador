ENV['RACK_ENV'] = 'development'

require 'fakeredis'
require 'rack/test'
include Rack::Test::Methods

require './api/v1/root'
require './api/v1/consultants/consultant'
require './api/v1/consultants/resource'

module API
  module V1
    describe 'consultant api' do
      def app
        Consultants::Resource
      end

      before(:each) do
        @data = [
          { 'id' => 1, 'name' => 'John Mullër',   'login' => 'jdmuller',  'role' => 'Dev', 'p2' => nil, 'p3' => nil },
          { 'id' => 2, 'name' => 'John Smith',    'login' => 'jsmith',    'role' => 'BA',  'p2' => 0,   'p3' => 1   },
          { 'id' => 3, 'name' => 'Mary Williams', 'login' => 'mwilliams', 'role' => 'QA',  'p2' => 1,   'p3' => 2   },
          { 'id' => 4, 'name' => 'Ted Smith',     'login' => 'tsmith',    'role' => 'Dev', 'p2' => 2,   'p3' => 0   }
        ]
        @redis = Redis.new
        @redis.flushdb
        @data.each do |record|
          @redis.hset Consultants::Consultant::REDIS_SCOPE, record['login'], record.to_json
        end
      end

      it 'should get all consultants' do
        get '/v1/consultants'
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(4)
        expect(response).to eq(add_email(@data))
      end

      it 'should skip consultants marked as not found' do
        record = @data[0].clone
        record['not_found'] = Consultants::Consultant::NOT_FOUND_THRESHOLD
        @redis.hset Consultants::Consultant::REDIS_SCOPE, record['login'], record.to_json

        record = @data[1].clone
        record['not_found'] = Consultants::Consultant::NOT_FOUND_THRESHOLD + 1
        @redis.hset Consultants::Consultant::REDIS_SCOPE, record['login'], record.to_json

        get '/v1/consultants'
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(2)
        expect(response).not_to include(add_email(@data[0, 1]).first)
        expect(response).not_to include(add_email(@data[1, 1]).first)
        expect(response).to     include(add_email(@data[2, 1]).first)
        expect(response).to     include(add_email(@data[3, 1]).first)
      end

      it 'should filter based on name' do
        get '/v1/consultants', { query: 'Smith' }
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(2)
        expect(response).to eq(add_email([ @data[1], @data[3] ]))
      end

      it 'should filter based on login' do
        get '/v1/consultants', { query: 'jsmith' }
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(1)
        expect(response).to eq(add_email([ @data[1] ]))
      end

      it 'should filter based on both name and login' do
        get '/v1/consultants', { query: 'd' }
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(2)
        expect(response).to eq(add_email([ @data[0], @data[3] ]))
      end

      it 'should return an empty array when the query is invalid' do
        get '/v1/consultants', { query: 'z' }
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response).to eq([])
      end

      it 'should handle transliteration ("a" should match "á", "ã", etc)' do
        get '/v1/consultants', { query: 'e' }
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(2)
        expect(response).to eq(add_email([ @data[0], @data[3] ]))
      end

      it 'should match with case insensitivy' do
        get '/v1/consultants', { query: 'smith' }
        response = JSON.parse(last_response.body).sort_by{|element| element['name']}
        expect(response.length).to eq(2)
        expect(response).to eq(add_email([ @data[1], @data[3] ]))
      end

      it 'should paginate the response' do
        @redis.flushdb
        13.times do |i|
          @redis.hset Consultants::Consultant::REDIS_SCOPE, "u#{i}@example.com", { 'name' => "User#{i}", 'login' => "user#{i}" }.to_json
        end

        get '/v1/consultants'
        response = JSON.parse(last_response.body)
        expect(response.length).to eq(10)

        get '/v1/consultants', { page: 2 }
        response = JSON.parse(last_response.body)
        expect(response.length).to eq(3)

        get '/v1/consultants', { per_page: 8 }
        response = JSON.parse(last_response.body)
        expect(response.length).to eq(8)

        get '/v1/consultants', { per_page: 8, page: 2 }
        response = JSON.parse(last_response.body)
        expect(response.length).to eq(5)

        get '/v1/consultants', { per_page: 8, page: 3 }
        response = JSON.parse(last_response.body)
        expect(response.length).to eq(0)
      end

      it 'should update the p2 and p3 attributes of a consultant' do
        put '/v1/consultants/jsmith', { p2: 1, p3: 2 }
        expect(last_response.status).to eq(200)
        consultant = JSON.parse(@redis.hget(Consultants::Consultant::REDIS_SCOPE, 'jsmith'))
        expect(consultant['p2']).to eq(1)
        expect(consultant['p3']).to eq(2)
      end

      it 'should raise and error when trying to set the p2 or p3 attributes of a consultant with an invalid value' do
        put '/v1/consultants/jsmith', { p2: 4 }
        expect(last_response.status).to eq(500)
        expect(last_response.body).to match(/invalid/)
        put '/v1/consultants/jsmith', { p3: 'astring' }
        expect(last_response.status).to eq(500)
        expect(last_response.body).to match(/invalid/)
      end

      private

      def add_email(records)
        records.map{|record| record.merge({ 'email' => "#{record['login']}@thoughtworks.com" }) }
      end
    end
  end
end
