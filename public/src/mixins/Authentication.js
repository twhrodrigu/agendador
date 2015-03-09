var React = require('react'),
    Auth = require('../Auth');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var nextPath = transition.path;
      if (!Auth.loggedIn()) {
        transition.redirect('/login',{}, { 'nextPath' : nextPath });
      }
    }
  }
};

module.exports = Authentication;
