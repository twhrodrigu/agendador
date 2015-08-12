require './api/v1/root'
require 'webmock/rspec'
require 'fakeredis'

module API
  module V1
    describe 'consultants by staffing office and role' do

      def to_json(consultant)
        return {
          'employeeId' => consultant.id,
          'loginName' => consultant.login,
          'preferredName' => consultant.name,
          'role' => {'name'=> consultant.role}
        }
      end

      def jigsaw_url(office, page)
        return "https://jigsaw.thoughtworks.com/api/people?staffing_office=#{office}&page=#{page}"
      end

      before(:all) do
        @alice = Consultants::Consultant.new(id: 0, login: 'alice', name: 'Alice', role: 'QA')
        @bob = Consultants::Consultant.new(id: 1, login: 'bob', name: 'Bob', role: 'Dev')
        @eve = Consultants::Consultant.new(id: 2, login: 'eve', name: 'Eve', role: 'BA')

        @office = 'Belo Horizonte'

        @request_headers = {
          'Authorization'=>'e9c735405f523e81f2f2884ea116411f',
          'Content-Type'=>'application/json',
          'Host'=>'jigsaw.thoughtworks.com',
          'X-Service-Version'=>'2'
        }

        WebMock.reset!
      end

      it 'should retrieve first page of consultants by staffing office' do
        json_first_page = [to_json(@alice), to_json(@bob)].to_json
        WebMock.stub_request(:get, jigsaw_url(@office, 1)).
          with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => {
            'X-Total-Pages'=>'1'
        })

        expect((Consultants::Service.consultants staffing_office: @office)).to contain_exactly(@alice, @bob)
      end

      it 'should retrieve all consultants by staffing office using pagination' do
        response_headers = {
          'X-Total-Pages'=>'2'
        }

        json_first_page = [to_json(@alice), to_json(@bob)].to_json
        WebMock.stub_request(:get, jigsaw_url(@office, 1)).
          with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => response_headers)

        json_second_page = [to_json(@eve)].to_json
        WebMock.stub_request(:get, jigsaw_url(@office, 2)).
          with(:headers => @request_headers).to_return(:status => 200, :body => json_second_page, :headers => response_headers)

        expect((Consultants::Service.consultants staffing_office: @office)).to contain_exactly(@alice, @bob, @eve)
      end

      it 'should retrieve all consultants by staffing office and role' do
        response_headers = {
          'X-Total-Pages'=>'2'
        }

        json_first_page = [to_json(@alice), to_json(@bob)].to_json
        WebMock.stub_request(:get, jigsaw_url(@office, 1)).
          with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => response_headers)

        json_second_page = [to_json(@eve)].to_json
        WebMock.stub_request(:get, jigsaw_url(@office, 2)).
          with(:headers => @request_headers).to_return(:status => 200, :body => json_second_page, :headers => response_headers)

        role = 'Dev'
        expect((Consultants::Service.consultants staffing_office: @office, role: role)).to contain_exactly(@bob)
      end

      it 'should retrieve all people when role is not specified' do
        json_first_page = [to_json(@alice), to_json(@bob)].to_json
        WebMock.stub_request(:get, jigsaw_url(@office, 1))
          .with(:headers => @request_headers).to_return(:status => 200, :body => json_first_page, :headers => {
            'X-Total-Pages'=>'1'
        })

        expect(Consultants::Service.consultants staffing_office: @office).to contain_exactly(@alice, @bob)
      end

      context 'consultants from all offices' do
        before(:each) do
          @bh0  = Consultants::Consultant.new(id: 1, login: 'bh0',  name: 'BH0',     role: 'QA')
          @bh1  = Consultants::Consultant.new(id: 2, login: 'bh1',  name: 'BH1',     role: 'Dev')
          @bh2  = Consultants::Consultant.new(id: 3, login: 'bh2',  name: 'BH2',     role: 'BA')
          @poa1 = Consultants::Consultant.new(id: 4, login: 'poa1', name: 'POA1',    role: 'Dev')
          @poa2 = Consultants::Consultant.new(id: 5, login: 'poa2', name: 'POA2',    role: 'BA')
          @rec1 = Consultants::Consultant.new(id: 6, login: 'rec1', name: 'Recife1', role: 'Dev')
          @rec2 = Consultants::Consultant.new(id: 7, login: 'rec2', name: 'Recife2', role: 'BA')
          @sp1  = Consultants::Consultant.new(id: 8, login: 'sp1',  name: 'SP1',     role: 'Dev')
          @sp2  = Consultants::Consultant.new(id: 9, login: 'sp2',  name: 'SP2',     role: 'BA')

          [['Belo Horizonte', [ to_json(@bh1),  to_json(@bh2)  ].to_json ],
           ['Porto Alegre',   [ to_json(@poa1), to_json(@poa2) ].to_json ],
           ['Recife',         [ to_json(@rec1), to_json(@rec2) ].to_json ],
           ['Sao Paulo',      [ to_json(@sp1),  to_json(@sp2)  ].to_json ]].each do |(office, response)|
            WebMock.stub_request(:get, Consultants::Service::JIGSAW_URL)
                   .with(query: { 'staffing_office' => office, 'page' => 1 })
                   .to_return(status: 200, body: response, headers: { 'X-Total-Pages' => '1' })
          end

          @redis = Redis.new
          @bh0.to_redis(@redis)
          @bh1.to_redis(@redis)
          @poa1.to_redis(@redis)
          @rec1.to_redis(@redis)
          @sp1.to_redis(@redis)
        end

        it 'should add consultants returned from jigsaw to redis' do
          Consultants::Service.save_jigsaw_consultants_to_redis(@redis)
          expect(Consultants::Consultant.from_redis(@redis, @bh2.login)).not_to  eq(nil)
          expect(Consultants::Consultant.from_redis(@redis, @poa2.login)).not_to eq(nil)
          expect(Consultants::Consultant.from_redis(@redis, @rec2.login)).not_to eq(nil)
          expect(Consultants::Consultant.from_redis(@redis, @sp2.login)).not_to  eq(nil)
        end

        it 'should update attributes returned from jigsaw on redis' do
          @bh1.role = 'PM'
          WebMock.stub_request(:get, Consultants::Service::JIGSAW_URL)
                 .with(query: { 'staffing_office' => 'Belo Horizonte', 'page' => 1 })
                 .to_return(status: 200, body: [ to_json(@bh1), to_json(@bh2) ].to_json, headers: { 'X-Total-Pages' => '1' })

          expect(Consultants::Consultant.from_redis(@redis, @bh1.login).role).to  eq('Dev')
          Consultants::Service.save_jigsaw_consultants_to_redis(@redis)
          expect(Consultants::Consultant.from_redis(@redis, @bh1.login).role).to  eq('PM')
        end

        it 'should mark consultants not returned from jigsaw as "not_found" on redis' do
          expect(Consultants::Consultant.from_redis(@redis, @bh0.login).not_found).to eq(nil)
          Consultants::Service.save_jigsaw_consultants_to_redis(@redis)
          expect(Consultants::Consultant.from_redis(@redis, @bh0.login).not_found).to eq(1)
        end
      end
    end
  end
end
