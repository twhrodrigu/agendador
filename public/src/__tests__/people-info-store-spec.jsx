var Actions = require('../actions/Actions'),
    request = require('superagent');

describe("PeopleInfoStore", function(){
  var store;

  beforeEach(function() {
    store = require('../stores/PeopleInfoStore');
  });

  it("should retrieve all people on successful ajax request", function(done) {
    require('superagent-mock')(request, require('./mock-config.js'));
    Actions.getConsultants.completed.listen(function () {
      expect(store.people.length).toEqual(2);
      done();
    });
    Actions.getConsultants();
  });

  it("should send params of getConsultants actions as a query string", function(done) {
    spyOn(request.Request.prototype, 'end').and.callFake(function () {
      expect(this._query).toEqual(['foo=bar']);
      done();
    });
    Actions.getConsultants({ foo: 'bar' });
  });

  it("should remove person with incomplete data", function(){
    var myData = require('./fixtures/people.js')();
    myData.push({id: 3, name: "Gustavo Gama"});

    var formattedData = store.rejectData(myData);

    expect(formattedData.length).toEqual(2);
    expect(formattedData[0].name).toEqual("Pedro Rocha");
    expect(formattedData[1].name).toEqual("Patrick Prado");
  });

  it("should return person with only specific attributes", function(){
    var data = [{
      id: 1,
      name: "Gustavo",
      email: "ggama@thoughtworks.com",
      test: "attribute test"
    }];

    expect(store.formatData(data)[0].test).toBeUndefined();
  });

  it("should set initial state", function(){
    expect(store.getInitialState()).toEqual({people: []});
  });
});
