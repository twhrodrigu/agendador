'use strict';

var Reflux  = require('reflux'),
    request = require('superagent'),
    _ = require('underscore');

var PeopleInfo = function(){
  var that         = {},
      requiredKeys = ["name", "email", "p3", "tech_pairing"];

  that.getInitialState = function (argument) {
    return {
      people: []
    };
  };

  that.getAll = function(){
    return request.get("/people.json");
  };

  that.rejectData = function (data) {
    return _.reject(data, function(person){
      return _.difference(requiredKeys, _.keys(person)).length != 0;
    });
  };

  that.formatData = function(people){
    return _.map(people, function(person){
      return formattedPerson(person);
    });
  };

  var formattedPerson = function(person){
    var newPerson = {};
    _.each(requiredKeys, function(key){ newPerson[key] = person[key]; })
    return newPerson;
  };

  return that;
};

var PeopleInfoStore = Reflux.createStore(PeopleInfo());

module.exports = PeopleInfoStore;
