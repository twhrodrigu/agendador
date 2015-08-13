var request = require('superagent'),
    config = require('./mock-config.js');
require('superagent-mock')(request, config);

describe("PeopleInfoStore", function(){
  var store;

  beforeEach(function(){
    store = require('../stores/PeopleInfoStore');
  });

  it("should list all people", function(){
    store.getAll().end(function(error, response){
      expect(response.body.length).toEqual(2);
    });
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
