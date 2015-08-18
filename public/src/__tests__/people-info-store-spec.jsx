var Actions = require('../actions/Actions'),
    request = require('superagent'),
    _       = require('underscore');
    
describe("PeopleInfoStore", function(){
  var store;

  beforeEach(function() {
    store = require('../stores/PeopleInfoStore');
    store.emitter.removeAllListeners();
    store.getInitialState();
  });
  
  it("should set initial state", function(){
    expect(store.getInitialState()).toEqual({people: []});
  });

  it("should retrieve all people on successful ajax request", function(done) {
    require('superagent-mock')(request, require('./mock-config.js'));
    Actions.getConsultants.completed.listen(function () {
      expect(store.people.length).toEqual(2);
      done();
    });
    Actions.getConsultants();
  });

  it("should send params of getConsultants action as a query string", function(done) {
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


  it("should send id and attrs of updateConsultant action as request parameters", function(done) {
    spyOn(request.Request.prototype, 'end').and.callFake(function () {
      expect(this._query).toEqual(['foo=bar']);
      expect(this.url).toMatch("/v1/consultants/pprado.json");
      done();
    });
    Actions.updateConsultant("pprado", { foo: 'bar' });
  });

  it("should update consultant attributes", function(done) {
    store.people.push(
      { 
        "id": 1,
        "login": "pprado",
        "name": "Patrick Prado",
        "email": "pprado@thoughtworks.com",
        "p2": "Pair",
        "role": "Dev",
        "extra_attr": 1
      }
    );
    var person = _.findWhere(store.people, {login: "pprado"});

    require('superagent-mock')(request, require('./mock-config.js'));
    
    Actions.updateConsultant.completed.listen(function (login) {
      expect(login).toBe("pprado");
      expect(person.p2).toEqual("Lead");
      expect(person.p3).toEqual("Lead");
      expect(person.extra_attr).toEqual(1);
      done();
    });

    expect(person.p2).toEqual("Pair");
    expect(person.p3).toBeUndefined();
    expect(person.extra_attr).toEqual(1);
    Actions.updateConsultant("pprado", {});
  });

});
