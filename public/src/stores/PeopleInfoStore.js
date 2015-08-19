'use strict';

var Reflux  = require('reflux'),
    Actions = require('../actions/Actions'),
    request = require('superagent'),
    assign  = require('react/lib/Object.assign'),
    _ = require('underscore');

var PeopleInfo = function(){
  var that         = {},
      requiredKeys = ["id", "name", "login", "email", "role", "p3", "p2"];

  that.listenables = Actions;

  that.getInitialState = function (argument) {
    return {
      people: (this.people = [])
    };
  };

  that.onGetConsultants = function (params) {
    return request.get('/v1/consultants.json')
                  .query(params)
                  .end(function (error, response) {
      if (response.ok) {
        Actions.getConsultants.completed(response.body);
      } else
        Actions.getConsultants.failed(response.text);
    });
  };

  that.onGetConsultantsCompleted = function (data) {
    this.people = that.formatData(that.rejectData(data));
    this.trigger({ people: this.people });
  };

  that.onGetConsultantsFailed = function (error) {
    console.log('PeopleInfoStore.onGetConsultantsFailed (error: %o)', error);
  };

  that.onUpdateConsultant = function(login, attrs) {
    return request.put('/v1/consultants/' + login + '.json')
                .query(attrs)
                .end(function (error, response) {
    if (response.ok) {
      Actions.updateConsultant.completed(login, response.body);
    } else
      Actions.updateConsultant.failed(response.text);
    });
  };

  that.onUpdateConsultantCompleted = function (login, data) {
    var person = _.findWhere(this.people, {login: login});
    assign(person, data);
    this.trigger({ people: this.people });
  };

  that.onUpdateConsultantFailed = function (error) {
    console.log('PeopleInfoStore.onGetConsultantsFailed (error: %o)', error);
    this.trigger({ people: this.people });
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
