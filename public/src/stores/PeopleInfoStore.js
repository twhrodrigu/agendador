'use strict';

var Reflux  = require('reflux'),
    request = require('superagent'),
    _ = require('underscore');

var PeopleInfo = function(){
  var that = {};

  that.getInitialState = function (argument) {
    return {
      people: []
    };
  };

  that.getAll = function(){
    return request.get("/people");
  };

  that.formatData = function (data) {
    var requiredKeys = ["id", "name", "email"];
    return _.reject(data, function(person){
      return _.difference(requiredKeys, _.keys(person)).length != 0;
    });
  };

  return that;
};

var PeopleInfoStore = Reflux.createStore(PeopleInfo());

module.exports = PeopleInfoStore;
