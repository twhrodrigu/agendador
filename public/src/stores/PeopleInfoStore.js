'use strict';

var Reflux  = require('reflux'),
    Actions = require('../actions/Actions'),
    request = require('superagent'),
    _ = require('underscore');

var PeopleInfo = function(){
  var that         = {},
      requiredKeys = ["name", "email", "p3", "tech_pairing"];

  that.listenables = Actions;

  that.getInitialState = function (argument) {
    return {
      people: []
    };
  };

  that.onGetConsultants = function () {
    console.log('PeopleInfoStore.onGetConsultants');
    return request.get('/v1/consultants.json').end(function (error, response) {
      console.log('PeopleInfoStore.onGetConsultants.end');
      if (response.ok)
        Actions.getConsultants.completed(response.body);
      else
        Actions.getConsultants.failed(response.text);
    });
  };

  that.onGetConsultantsCompleted = function (data) {
    console.log('PeopleInfoStore.onGetConsultantsCompleted');
    this.people = this.formatData(this.rejectData(data));
    this.trigger({ people: this.people });
  };

  that.onGetConsultantsFailed = function (error) {
    console.log('PeopleInfoStore.onGetConsultantsFailed');
    console.log('error: ', error);
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
