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
      expect(response.people.length).toEqual(2);
    });
  });

  it("should remove inconsistent data", function(){
    var myData = require('./fixtures/people.js')();
    myData.push({id: 3, name: "Gustavo Gama"});

    var formattedData = store.formatData(myData);

    expect(formattedData.length).toEqual(2);
    expect(formattedData[0].name).toEqual("Procha");
    expect(formattedData[1].name).toEqual("Patrick Prado");
  });

  it("should set initial state", function(){
    expect(store.getInitialState()).toEqual({people: []});
  });
});
